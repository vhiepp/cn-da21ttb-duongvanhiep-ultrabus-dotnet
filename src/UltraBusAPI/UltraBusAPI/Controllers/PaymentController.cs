using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UltraBusAPI.Controllers
{
    [Route("api/payment")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        public PaymentController() { }

        // Thanh toán vé xe
        [HttpPost("ticket/{id}")]
        public IActionResult BuyTicket(int id)
        {
            return Ok();
        }

        // Webhook thanh toán
        [HttpPost("webhook")]
        public IActionResult Webhook()
        {
            return Ok();
        }
    }
}
