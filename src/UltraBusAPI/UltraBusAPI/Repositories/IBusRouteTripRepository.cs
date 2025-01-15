using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories
{
    public interface IBusRouteTripRepository : IBaseRepository<BusRouteTrip>
    {
        public Task<List<BusRouteTrip>> GetByBusRouteIdAndBusId(int busRouteId, int busId);
        public Task<BusRouteTrip?> FindByBusRouteIdBusIdAndTime(int busRouteId, int busId, DateTime time);
        public Task<List<BusRouteTrip>> GetByBusRouteId(int busRouteId);
    }
}
