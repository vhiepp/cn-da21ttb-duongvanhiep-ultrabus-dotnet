using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories
{
    public interface IBusRouteStationRepository : IBaseRepository<BusRouteStation>
    {
        public Task<List<BusRouteStation>> GetBusRouteStationsByBusRouteId(int busRouteId);

        public Task<List<BusRouteStation>> GetBusRouteStationsByBusStationId(int busStationId);

        public Task DeleteBusRouteStationByBusRouteId(int busRouteId);
    }
}
