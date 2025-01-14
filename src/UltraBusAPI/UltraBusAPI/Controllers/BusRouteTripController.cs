using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UltraBusAPI.Attributes;
using UltraBusAPI.Models;
using UltraBusAPI.Services;

namespace UltraBusAPI.Controllers
{
    [Route("api/bus-route-trips")]
    [ApiController]
    public class BusRouteTripController : ControllerBase
    {
        private readonly IBusRouteTripService _busRouteTripService;

        public BusRouteTripController(IBusRouteTripService busRouteTripService)
        {
            _busRouteTripService = busRouteTripService;
        }

        [HttpPut]
        [Authorize]
        [Permission("TripManager")]
        public async Task<IActionResult> UpdateBusRouteTrip([FromBody] UpdateBusRouteTripModel busRouteTripModel)
        {
            await _busRouteTripService.UpdateBusRouteTrip(busRouteTripModel);
            return Ok(new ApiResponse()
            {
                Message = "Bus route trip updated successfully",
                Success = true
            });
        }

        [HttpGet("{busRouteId}/{busId}")]
        [Authorize]
        public async Task<IActionResult> GetByBusRouteIdAndBusId(int busRouteId, int busId)
        {
            var busRouteTripModels = await _busRouteTripService.GetByBusRouteIdAndBusId(busRouteId, busId);
            return Ok(new ApiResponse()
            {
                Data = busRouteTripModels,
                Message = "Get bus route trips successfully",
                Success = true
            });
        }
    }
}
