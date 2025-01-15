using UltraBusAPI.Models;

namespace UltraBusAPI.Services
{
    public interface ITicketService
    {
        public Task<TicketModel> CreateTicketAsync(CreateTicketModel model, int userId);

        public Task<List<TicketModel>> SearchTickets(SearchTicketModel model);

        public Task<List<TicketModel>> GetTicketByUserId(int userId);
    }
}
