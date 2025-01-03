using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using UltraBusAPI.Attributes;
using UltraBusAPI.Models;
using UltraBusAPI.Services;

namespace UltraBusAPI.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public UserController()
        {
           
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok();
        }

        [HttpPost]
        public IActionResult Create()
        {
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id)
        {
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return Ok();
        }

    }

    [Route("api/users/admin")]
    [ApiController]
    public class UserAdminController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserAdminController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Permission("SuperAdmin")]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userService.GetAllAdmin();

            return Ok(new ApiResponse()
            {
                Success = true,
                Data = users,
                Message = "Get all users successfully"
            });
        }

        [HttpGet("{id}")]
        [Permission("SuperAdmin")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await _userService.GetAdminById(id);
            if (user == null)
            {
                return NotFound(new ApiResponse()
                {
                    Success = false,
                    Message = "User not found"
                });
            }
            return Ok(new ApiResponse()
            {
                Success = true,
                Data = user,
                Message = "Get user successfully"
            });
        }

        [HttpPost]
        [Permission("SuperAdmin")]
        public async Task<IActionResult> Create(CreateUserModel createUserModel)
        {
            await _userService.Create(createUserModel);

            return Ok(new ApiResponse()
            {
                Success = true,
                Message = "Create user successfully"
            });
        }

        [HttpPut("{id}")]
        [Permission("SuperAdmin")]
        public async Task<IActionResult> Update(int id, CreateUserModel createUserModel)
        {
            await _userService.Update(id, createUserModel);
            return Ok(new ApiResponse()
            {
                Success = true,
                Message = "Update user successfully"
            });
        }

        [HttpDelete("{id}")]
        [Permission("SuperAdmin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _userService.Delete(id);

            return Ok(new ApiResponse()
            {
                Success = true,
                Message = "Delete user successfully"
            });
        }

    }
}
