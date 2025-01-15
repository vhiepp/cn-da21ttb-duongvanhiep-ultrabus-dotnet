using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UltraBusAPI.Attributes;
using UltraBusAPI.Models;
using UltraBusAPI.Services;

namespace UltraBusAPI.Controllers
{
    [Route("api/tickets")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService _ticketService;
        public TicketController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }

        [HttpGet]
        [Authorize]
        [Permission("TicketManager")]
        public async Task<IActionResult> GetAll([FromQuery] SearchTicketModel model)
        {
            var result = await _ticketService.SearchTickets(model);
            return Ok(
                new ApiResponse()
                {
                    Message = "Get all tickets successfully",
                    Success = true,
                    Data = result
                }
            );
        }

        [HttpGet("for-me")]
        [Authorize]
        public async Task<IActionResult> GetForMe()
        {
            var userIdClaim = User.FindFirst("Id");
            if (userIdClaim == null)
            {
                return Unauthorized();
            }
            int userId = int.Parse(userIdClaim.Value);

            var result = await _ticketService.GetTicketByUserId(userId);
            return Ok(
                new ApiResponse()
                {
                    Message = "Get all tickets successfully",
                    Success = true,
                    Data = result
                }
            );
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok();
        }

        // Đặt vé xe    
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateTicketModel createTicket)
        {
            var userIdClaim = User.FindFirst("Id");
            if (userIdClaim == null)
            {
                return Unauthorized();
            }
            int userId = int.Parse(userIdClaim.Value);
            var result = await _ticketService.CreateTicketAsync(createTicket, userId);
            return Ok(
                new ApiResponse()
                {
                    Message = "Create ticket successfully",
                    Success = true,
                    Data = result
                }
            );
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
