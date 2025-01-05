using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UltraBusAPI.Attributes;
using UltraBusAPI.Models;
using UltraBusAPI.Services;

namespace UltraBusAPI.Controllers
{
    [Route("api/bus-stations")]
    [ApiController]
    public class BusStationController : ControllerBase
    {
        private readonly IBusStationService _busStationService;

        public BusStationController(IBusStationService busStationService)
        {
            _busStationService = busStationService;
        }

        [HttpGet]
        [Authorize]
        [Permission("StationManager")]
        public async Task<IActionResult> GetAll()
        {
            var busStations = await _busStationService.GetBusStationAsync();
            return Ok(new ApiResponse()
            {
                Success = true,
                Data = busStations,
                Message = "Get bus stations successfully"
            });
        }

        [HttpGet("{id}")]
        [Authorize]
        [Permission("StationManager")]
        public IActionResult Get(int id)
        {
            return Ok();
        }

        [HttpPost]
        [Authorize]
        [Permission("StationManager")]
        public async Task<IActionResult> Create(CreateBusStationModel createBusStationModel)
        {
            await _busStationService.Create(createBusStationModel);

            return Ok(new ApiResponse()
            {
                Success = true,
                Message = "Create bus station successfully"
            });
        }

        [HttpPut("{id}")]
        [Authorize]
        [Permission("StationManager")]
        public IActionResult Update(int id)
        {
            return Ok();
        }

        [HttpDelete("{id}")]
        [Authorize]
        [Permission("StationManager")]
        public async Task<IActionResult> Delete(int id)
        {
            await _busStationService.Delete(id);

            return Ok(new ApiResponse()
            {
                Success = true,
                Message = "Delete bus station successfully"
            });
        }
    }
}
