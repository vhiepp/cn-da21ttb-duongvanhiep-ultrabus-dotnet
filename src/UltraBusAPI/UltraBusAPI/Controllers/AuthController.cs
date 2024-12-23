using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UltraBusAPI.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public AuthController()
        {
        }

        [HttpPost("login")]
        public IActionResult Login()
        {
            return Ok();
        }

        [HttpPost("register")]
        public IActionResult Register()
        {
            return Ok();
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
        public IActionResult Profile()
        {
            return Ok();
        }

        [HttpPut("update-profile")]
        public IActionResult UpdateProfile()
        {
            return Ok();
        }
    }
}
