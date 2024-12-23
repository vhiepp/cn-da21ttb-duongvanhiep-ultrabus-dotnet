using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UltraBusAPI.Controllers
{
    [Route("api/tickets")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        public TicketController() { }

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

        // Đặt vé xe    
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

        // Đánh giá chuyến đi
        [HttpPost("{id}/rate")]
        public IActionResult Rate(int id)
        {
            return Ok();
        }
    }
}
