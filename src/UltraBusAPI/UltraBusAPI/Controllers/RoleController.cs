using Microsoft.AspNetCore.Mvc;
using UltraBusAPI.Attributes;
using UltraBusAPI.Models;
using UltraBusAPI.Services;

namespace UltraBusAPI.Controllers
{
    [Route("api/roles")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        public readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpGet]
        [Permission("SuperAdmin")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _roleService.GetAll();
            return Ok(
                new ApiResponse()
                {
                    Message = "Get all roles successfully",
                    Success = true,
                    Data = result
                }
            );
        }

        [HttpGet("{id}")]
        [Permission("SuperAdmin")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await _roleService.GetById(id);
            if (result == null)
            {
                return NotFound(
                    new ApiResponse()
                    {
                        Message = "Role not found",
                        Success = false
                    }
                );
            }
            return Ok(
                new ApiResponse()
                {
                    Message = "Get role successfully",
                    Success = true,
                    Data = result
                }
            );
        }

        [HttpPost]
        [Permission("SuperAdmin")]
        public async Task<IActionResult> Create(CreateRoleModel createRoleModel)
        {
            await _roleService.CreateRoleGroup(createRoleModel);
            return Ok(
                new ApiResponse()
                {
                    Message = "Create role successfully",
                    Success = true
                }
            );
        }

        [HttpPut("{id}")]
        [Permission("SuperAdmin")]
        public async Task<IActionResult> Update(int id, CreateRoleModel roleModel)
        {
            await _roleService.Update(id, roleModel);
            return Ok(new ApiResponse()
            {
                Success = true,
                Message = "Update role successfully"
            });
        }

        [HttpDelete("{id}")]
        [Permission("SuperAdmin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _roleService.Delete(id);
            return Ok(new ApiResponse()
            {
                Success = true,
                Message = "Delete role successfully"
            });
        }
    }

    [Route("api/permissions")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        public readonly IRoleService _roleService;

        public PermissionController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpGet]
        [Permission("SuperAdmin")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _roleService.GetAllPermission();
            return Ok(
                new ApiResponse()
                {
                    Message = "Get all permissions successfully",
                    Success = true,
                    Data = result
                }
            );
        }
    }
}
