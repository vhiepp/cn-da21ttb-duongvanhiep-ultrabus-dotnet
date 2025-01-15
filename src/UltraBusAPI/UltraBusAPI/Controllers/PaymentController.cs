using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Net.payOS.Types;
using UltraBusAPI.Models;
using UltraBusAPI.Services;

namespace UltraBusAPI.Controllers
{
    [Route("api/payment")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        // Thanh toán vé xe
        [HttpPost("ticket")]
        [Authorize]
        public async Task<IActionResult> BuyTicket([FromBody] PaymentTicketRequestModel model)
        {
            var userIdClaim = User.FindFirst("Id");
            if (userIdClaim == null)
            {
                return Unauthorized();
            }
            int userId = int.Parse(userIdClaim.Value);
            var result = await _paymentService.CreatePaymentAsync(model, userId);
            return Ok(
                new ApiResponse()
                {
                    Message = "Create payment successfully",
                    Success = true,
                    Data = result
                }
            );
        }

        // Webhook thanh toán
        [HttpPost("webhook")]
        public async Task<IActionResult> Webhook([FromBody] WebhookType webHookBody)
        {
            var result = await _paymentService.WebHook(webHookBody);

            return Ok(new
            {
                success = result
            }
            );
        }
    }
}
