using Net.payOS.Types;
using UltraBusAPI.Models;

namespace UltraBusAPI.Services
{
    public interface IPaymentService
    {
        public Task<CreatePaymentResult> CreatePaymentAsync(PaymentTicketRequestModel model, int userId);

        public Task<bool> WebHook(WebhookType webhook);
    }
}
