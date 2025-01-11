using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UltraBusAPI.Models;
using UltraBusAPI.Services;

namespace UltraBusAPI.Controllers
{
    [Route("api/otps")]
    [ApiController]
    public class OTPController : ControllerBase
    {
        private readonly IOTPService _otpService;

        public OTPController(IOTPService otpService)
        {
            _otpService = otpService;
        }

        [HttpPost("send-otp-phone-number")]
        public async Task<IActionResult> SendOTPPhoneNumber(OTPPhoneNumberModelRequest oTPPhone)
        {
            var result = await _otpService.CreateOTPAsync(oTPPhone);
            return Ok(
                new ApiResponse()
                {
                    Message = "OTP sent successfully",
                    Success = true,
                    Data = result
                }
            );
        }

        [HttpGet("get-all-otp-not-send")]
        public async Task<IActionResult> GetAllOTPNotSend()
        {
            var result = await _otpService.GetAllOTPNotSend();
            return Ok(
                new ApiResponse()
                {
                    Message = "Get all OTP not send successfully",
                    Success = true,
                    Data = result
                }
            );
        }

        [HttpPut("update-sent-status/{id}")]
        public async Task<IActionResult> UpdateSentStatus(int id)
        {
            await _otpService.UpdateSentStatus(id);
            return Ok(
                new ApiResponse()
                {
                    Message = "Update sent status successfully",
                    Success = true
                }
            );
        }
    }
}
