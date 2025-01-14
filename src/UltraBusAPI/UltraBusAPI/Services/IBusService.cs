using UltraBusAPI.Models;

namespace UltraBusAPI.Services
{
    public interface IBusService
    {
        public Task CreateBus(CreateBusModel busModel);

        public Task<List<BusModel>> GetAll();

        public Task<BusModel?> FindById(int id);

        public Task DeleteById(int id);

        public Task UpdateBus(int id, CreateBusModel busModel);
    }
}
