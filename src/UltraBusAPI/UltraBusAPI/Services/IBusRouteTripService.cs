using UltraBusAPI.Models;

namespace UltraBusAPI.Services
{
    public interface IBusRouteTripService
    {
        public Task UpdateBusRouteTrip(UpdateBusRouteTripModel busRouteTripModel);

        public Task<List<BusRouteTripModel>> GetByBusRouteIdAndBusId(int busRouteId, int busId);
    }
}
