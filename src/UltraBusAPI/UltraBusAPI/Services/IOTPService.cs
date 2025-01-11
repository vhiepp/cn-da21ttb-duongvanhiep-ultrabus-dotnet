using UltraBusAPI.Models;

namespace UltraBusAPI.Services
{
    public interface IOTPService
    {
        public Task<OTPModel> CreateOTPAsync(OTPPhoneNumberModelRequest model);

        public Task<bool> VerifyOTPAsync(string phoneNumber, string code, string key);

        public Task<List<OTPSmsModel>> GetAllOTPNotSend();

        public Task UpdateSentStatus(int id);
    }
}
