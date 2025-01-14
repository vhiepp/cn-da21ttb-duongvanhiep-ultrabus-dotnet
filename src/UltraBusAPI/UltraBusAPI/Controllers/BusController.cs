using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UltraBusAPI.Attributes;
using UltraBusAPI.Models;
using UltraBusAPI.Services;

namespace UltraBusAPI.Controllers
{
    [Route("api/bus")]
    [ApiController]
    public class BusController : ControllerBase
    {
        private readonly IBusService _busService;

        public BusController(IBusService busService)
        {
            _busService = busService;
        }

        [HttpPost]
        [Authorize]
        [Permission("CarManager")]
        public async Task<IActionResult> CreateBus([FromBody] CreateBusModel busModel)
        {
            await _busService.CreateBus(busModel);
            return Ok(new ApiResponse()
            {
                Message = "Bus created successfully",
                Success = true
            });
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var busModels = await _busService.GetAll();
            return Ok(new ApiResponse()
            {
                Data = busModels,
                Message = "Get all buses successfully",
                Success = true
            });
        }

        [HttpGet("{id}")]
        [Authorize]
        [Permission("CarManager")]
        public async Task<IActionResult> GetById(int id)
        {
            var busModel = await _busService.FindById(id);
            if (busModel == null)
            {
                return NotFound(new ApiResponse()
                {
                    Message = "Bus not found",
                    Success = false
                });
            }
            return Ok(new ApiResponse()
            {
                Data = busModel,
                Message = "Get bus successfully",
                Success = true
            });
        }

        [HttpDelete("{id}")]
        [Authorize]
        [Permission("CarManager")]
        public async Task<IActionResult> DeleteById(int id)
        {
            await _busService.DeleteById(id);
            return Ok(new ApiResponse()
            {
                Message = "Bus deleted successfully",
                Success = true
            });
        }

        [HttpPut("{id}")]
        [Authorize]
        [Permission("CarManager")]
        public async Task<IActionResult> UpdateBus(int id, [FromBody] CreateBusModel busModel)
        {
            await _busService.UpdateBus(id, busModel);
            return Ok(new ApiResponse()
            {
                Message = "Bus updated successfully",
                Success = true
            });
        }
    }
}
