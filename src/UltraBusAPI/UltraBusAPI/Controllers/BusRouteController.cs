using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UltraBusAPI.Attributes;
using UltraBusAPI.Models;
using UltraBusAPI.Services;

namespace UltraBusAPI.Controllers
{
    [Route("api/bus-routes")]
    [ApiController]
    public class BusRouteController : ControllerBase
    {
        public readonly IBusRouteService _busRouteService;
        public BusRouteController(IBusRouteService busRouteService)
        {
            _busRouteService = busRouteService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var busRouteModels = await _busRouteService.GetAll();
            return Ok(new ApiResponse()
            {
                Data = busRouteModels,
                Message = "Get all bus routes successfully",
                Success = true
            });
        }

        [HttpGet("{id}")]
        [Authorize]
        [Permission("RouteManager")]
        public async Task<IActionResult> Get(int id)
        {
            var busRouteModel = await _busRouteService.FindById(id);
            if (busRouteModel == null)
            {
                return NotFound(new ApiResponse()
                {
                    Message = "Bus route not found",
                    Success = false
                });
            }
            return Ok(new ApiResponse()
            {
                Data = busRouteModel,
                Message = "Get bus route successfully",
                Success = true
            });
        }

        [HttpPost]
        [Authorize]
        [Permission("RouteManager")]
        public async Task<IActionResult> Create(CreateBusRouteModel busRouteModel)
        {
            await _busRouteService.CreateBusRoute(busRouteModel);
            return Ok(new ApiResponse()
            {
                Success = true,
                Message = "Bus route created successfully"
            });
        }

        [HttpPut("{id}")]
        [Authorize]
        [Permission("RouteManager")]
        public async Task<IActionResult> Update(int id, CreateBusRouteModel busRouteModel)
        {
            await _busRouteService.UpdateBusRoute(id, busRouteModel);
            return Ok(new ApiResponse()
            {
                Success = true,
                Message = "Bus route updated successfully"
            });
        }

        [HttpDelete("{id}")]
        [Authorize]
        [Permission("RouteManager")]
        public async Task<IActionResult> Delete(int id)
        {
            await _busRouteService.DeleteBusRoute(id);
            return Ok(new ApiResponse()
            {
                Success = true,
                Message = "Bus route deleted successfully"
            });
        }

        // Tìm kiếm tuyến xe bus theo điểm đầu và điểm cuối
        [HttpGet("search")]
        public IActionResult Search()
        {
            return Ok();
        }

        // Lấy danh sách các điểm dừng trên tuyến xe bus
        [HttpGet("{id}/bus-stops")]
        public IActionResult GetBusStops(int id)
        {
            return Ok();
        }

    }
}
