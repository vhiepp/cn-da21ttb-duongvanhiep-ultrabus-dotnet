using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UltraBusAPI.Controllers
{
    [Route("api/bus-routes")]
    [ApiController]
    public class BusRouteController : ControllerBase
    {
        public BusRouteController() { }

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
