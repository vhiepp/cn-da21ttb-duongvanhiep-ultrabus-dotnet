using UltraBusAPI.Models;

namespace UltraBusAPI.Services
{
    public interface IBusRouteTripService
    {
        public Task UpdateBusRouteTrip(UpdateBusRouteTripModel busRouteTripModel);

        public Task<List<BusRouteTripModel>> GetByBusRouteIdAndBusId(int busRouteId, int busId);

        public Task<List<BusRouteTripModel>> SearchBusRouteTrips(SearchBusRouteTripsModel searchBusRouteTrips);

        public Task<BusRouteTripModel> FindById(int id, DateTime date);
    }
}
