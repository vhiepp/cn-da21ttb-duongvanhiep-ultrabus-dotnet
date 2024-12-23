using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UltraBusAPI.Controllers
{
    [Route("api/bus-stations")]
    [ApiController]
    public class BusStationController : ControllerBase
    {
        public BusStationController() { }

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
}
