using UltraBusAPI.Models;

namespace UltraBusAPI.Services
{
    public interface ITicketService
    {
        public Task<TicketModel> CreateTicketAsync(CreateTicketModel model, int userId);
    }
}
