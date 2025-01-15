using Net.payOS;
using Net.payOS.Types;
using UltraBusAPI.Models;
using UltraBusAPI.Repositories;

namespace UltraBusAPI.Services.Sers
{
    public class PaymentService : IPaymentService
    {
        private readonly ITicketRepository _ticketRepository;
        private readonly IUserRepository _userRepository;
        private readonly PayOS _payOS;
        private readonly string clientId = "5a659af5-8688-4037-aa65-40539fc72c45";
        private readonly string apiKey = "a7583479-568e-4f19-8143-063daf490715";
        private readonly string checksumKey = "36e54db6532f2257e822ee41b01a195b1e9a7efea44ab9b125a9b2232add57a5";
        public PaymentService(ITicketRepository ticketRepository, IUserRepository userRepository)
        {
            _ticketRepository = ticketRepository;
            _userRepository = userRepository;
            _payOS = new PayOS(clientId, apiKey, checksumKey);
        }
        public async Task<CreatePaymentResult?> CreatePaymentAsync(PaymentTicketRequestModel model, int userId)
        {
            Random random = new Random();
            var ticket = await _ticketRepository.FindByIdAsync(model.TicketId);
            if (ticket == null)
            {
                return null;
            }
            if (ticket.UserId != userId)
            {
                return null;
            }
            List<ItemData> items = new List<ItemData>();
            int price = 0;
            if (ticket.TotalPrice != null)
            {
                price = (int)ticket.TotalPrice;
            }

            long orderId = random.Next(100000, 100000000);

            PaymentData paymentData = new PaymentData(orderId, price, $"{ticket.Id}", items, model.CancelUrl, model.ReturnUrl);
            var paymentLink = await _payOS.createPaymentLink(paymentData);
            ticket.CheckoutUrl = paymentLink.checkoutUrl;
            await _ticketRepository.UpdateAsync(ticket);
            return paymentLink;
        }

        public async Task<bool> WebHook(WebhookType webhook)
        {
            var webHookData = _payOS.verifyPaymentWebhookData(webhook);
            if (webHookData == null)
            {
                return await Task.FromResult(false);
            }
            var ticket = await _ticketRepository.FindByIdAsync(int.Parse(webHookData.description));
            if (ticket == null)
            {
                return await Task.FromResult(false);
            }
            ticket.IsPaid = true;
            ticket.PaymentMethod = "CK";
            ticket.ReceivedAmount = webHookData.amount;
            await _ticketRepository.UpdateAsync(ticket);
            return await Task.FromResult(true);
        }
    }
}
