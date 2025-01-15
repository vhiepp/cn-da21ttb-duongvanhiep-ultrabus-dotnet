using System.Reflection.Emit;
using UltraBusAPI.Datas;
using UltraBusAPI.Models;
using UltraBusAPI.Repositories;

namespace UltraBusAPI.Services.Sers
{
    public class OTPService : IOTPService
    {
        private readonly IOTPRepository _otpRepository;
        public OTPService(IOTPRepository otpRepository)
        {
            _otpRepository = otpRepository;
        }
        public async Task<OTPModel> CreateOTPAsync(OTPPhoneNumberModelRequest model)
        {
            int otpCode = new Random().Next(1000, 9999);
            OTP otp = new OTP
            {
                PhoneNumber = model.PhoneNumber,
                Code = otpCode.ToString(),
                Key = Guid.NewGuid().ToString(),
                ExpiredAt = DateTime.Now.AddMinutes(5),
                Content = $"[UltraBus]\nMa OTP cua ban la {otpCode}, ma se het han sau 5 phut.\nVui long khong chia se ma nay voi bat ky ai!\nCam on quy khach da su dung dich vu!"
                //Content = "[UltraBus]\nThong tin dat ve\nKH: Duong Van Hiep\nHT: Tra Vinh - Ho Chi Minh\nNgay: 11/01/2025\nGio khoi hanh: 11:00\nSVe: 2\nTT: Da thanh toan\nCam on quy khach!"
                //Content = $"{otpCode}",
            };
            await _otpRepository.AddAsync(otp);
            return new OTPModel
            {
                PhoneNumber = otp.PhoneNumber,
                //Code = otp.Code,
                Key = otp.Key,
                ExpiredAt = otp.ExpiredAt
            };
        }

        public async Task<List<OTPSmsModel>> GetAllOTPNotSend()
        {
            var otps = await _otpRepository.GetAllAsync();
            var otpNotSend = otps.Where(x => x.Sent == false && x.ExpiredAt >= DateTime.Now);

            return otpNotSend.Select(x => new OTPSmsModel
            {
                Id = x.Id,
                PhoneNumber = x.PhoneNumber,
                Content = x.Content
            }).ToList();
        }

        public async Task UpdateSentStatus(int id)
        {
            var otp = await _otpRepository.FindByIdAsync(id);
            if (otp != null)
            {
                otp.Sent = true;
                await _otpRepository.UpdateAsync(otp);
            }
        }

        public async Task<bool> VerifyOTPAsync(string phoneNumber, string code, string key)
        {
            var otp = await _otpRepository.FindByPhoneNumberAsync(phoneNumber, key);
            if (otp == null)
            {
                return false;
            }
            if (otp.Code != code)
            {
                return false;
            }
            if (otp.ExpiredAt < DateTime.Now)
            {
                return false;
            }
            if (otp.IsUsed == true)
            {
                return false;
            }
            otp.IsUsed = true;
            await _otpRepository.UpdateAsync(otp);
            return true;
        }

    }
}
