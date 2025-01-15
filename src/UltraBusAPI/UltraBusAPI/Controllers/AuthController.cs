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
        public readonly IRoleService _roleService;
        public readonly IUserService _userService;


        public AuthController(IAuthService authService, IRoleService roleService, IUserService userService)
        {
            _authService = authService;
            _roleService = roleService;
            _userService = userService;
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

        [HttpPost("login-with-phone-number")]
        public async Task<IActionResult> LoginWithPhoneNumber(SignInWithPhoneNumberModel signInWithPhone)
        {
            var result = await _authService.LoginWithPhoneNumber(signInWithPhone);
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
        [Permission("iweowe")]
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

        [HttpGet("permissions")]
        [Authorize]
        public async Task<IActionResult> GetPermissions()
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
            var user = await _userService.FindById(userId);
            if (user == null)
            {
                return Ok(
                    new ApiResponse()
                    {
                        Message = "User not found",
                        Success = false
                    }
                );
            }
            if (user.IsCustomer)
            {
                return Ok(
                    new ApiResponse()
                    {
                        Message = "Permission denied",
                        Success = false
                    }
                );
            }
            if (user.IsSuperAdmin)
            {
                return Ok(
                    new ApiResponse()
                    {
                        Message = "You are SuperAdmin",
                        Success = true,
                        Data = new List<PermissionModel> {
                            new PermissionModel()
                            {
                                Id = 0,
                                Name = "Super Admin",
                                KeyName = "SuperAdmin",
                                Description = "SuperAdmin"
                            }
                        }
                    }
                );
            }
            if (user.RoleId == null)
            {
                return Ok(
                    new ApiResponse()
                    {
                        Message = "Role not found",
                        Success = false
                    }
                );
            }
            var permissions = await _roleService.GetPermissionByRoleId(user.RoleId.Value);
            return Ok(
                new ApiResponse()
                {
                    Message = "Get permissions successfully",
                    Success = true,
                    Data = permissions
                }
            );
        }
    }
}
