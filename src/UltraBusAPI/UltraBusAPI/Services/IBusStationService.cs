using UltraBusAPI.Models;

namespace UltraBusAPI.Services
{
    public interface IBusStationService
    {
        public Task<List<BusStationModel>> GetBusStationAsync();

        public Task Create(CreateBusStationModel createBusStationModel);

        public Task Delete(int id);
    }
}
