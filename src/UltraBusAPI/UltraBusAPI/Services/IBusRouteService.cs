using UltraBusAPI.Models;

namespace UltraBusAPI.Services
{
    public interface IBusRouteService
    {
        public Task CreateBusRoute(CreateBusRouteModel busRouteModel);

        public Task DeleteBusRoute(int id);

        public Task UpdateBusRoute(int id, CreateBusRouteModel busRouteModel);

        public Task<List<BusRouteModel>> GetAll();

        public Task<BusRouteModel?> FindById(int id);
    }
}
