using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Transactions;
using UltraBusAPI.Attributes;
using UltraBusAPI.Models;
using UltraBusAPI.Services;

namespace UltraBusAPI.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(SignInModel signIn)
        {
            var result = await _authService.Login(signIn);
            if (result is Dictionary<string, string>)
            {
                return Ok(
                    new ApiResponse()
                    {
                        Message = "Login failed",
                        Errors = result,
                        Success = false
                    }
                );
            }
            return Ok(
                new ApiResponse()
                {
                    Message = "Login successfully",
                    Success = true,
                    Data = result
                }
            );
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(SignUpModel signUp)
        {   
            var valid = signUp.Validate();
            if (valid.Count > 0)
            {
                return await Task.FromResult(Ok(
                    new ApiResponse()
                    {
                        Message = "Register failed",
                        Errors = valid,
                        Success = false
                    }
                ));
            }
            var result = await _authService.RegisterCustomer(signUp);
            if (result is Dictionary<string, string>)
            {
                return await Task.FromResult(Ok(
                    new ApiResponse()
                    {
                        Message = "Register failed",
                        Errors = result,
                        Success = false
                    }
                ));
            }
            return await Task.FromResult(Ok(
                new ApiResponse()
                {
                    Message = "Register successfully",
                    Success = true
                }
            ));
        }

        [HttpPost("forgot-password")]
        public IActionResult ForgotPassword()
        {
            return Ok();
        }

        [HttpPost("reset-password")]
        public IActionResult ResetPassword()
        {
            return Ok();
        }

        [HttpPost("logout")]
        public IActionResult Logout() {
            return Ok();
        }

        [HttpPost("refresh-token")]
        public IActionResult RefreshToken() {
            return Ok();
        }

        [HttpGet("profile")]
        [Authorize]
        public async Task<IActionResult> Profile()
        {
            var claimUserId = User.FindFirst("Id");
            if (claimUserId == null)
            {
                return Ok(
                    new ApiResponse()
                    {
                        Message = "User not found",
                        Success = false
                    }
                );
            }
            var userId = int.Parse(claimUserId.Value);
            var result = await _authService.Profile(userId);
            if (result is Dictionary<string, string>)
            {
                return Ok(
                    new ApiResponse()
                    {
                        Message = "Profile not found",
                        Errors = result,
                        Success = false
                    }
                );
            }
            return Ok(
                new ApiResponse()
                {
                    Message = "Get profile success",
                    Success = true,
                    Data = result
                }
            );
        }

        [HttpPut("profile")]
        [Authorize]
        public IActionResult UpdateProfile()
        {
            return Ok();
        }
    }
}
