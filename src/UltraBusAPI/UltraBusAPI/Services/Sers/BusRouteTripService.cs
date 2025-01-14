using UltraBusAPI.Datas;
using UltraBusAPI.Models;
using UltraBusAPI.Repositories;

namespace UltraBusAPI.Services.Sers
{
    public class BusRouteTripService : IBusRouteTripService
    {
        private readonly IBusRouteTripRepository _busRouteTripRepository;

        public BusRouteTripService(IBusRouteTripRepository busRouteTripRepository)
        {
            _busRouteTripRepository = busRouteTripRepository;
        }

        public async Task<List<BusRouteTripModel>> GetByBusRouteIdAndBusId(int busRouteId, int busId)
        {
            var busRouteTrips = await _busRouteTripRepository.GetByBusRouteIdAndBusId(busRouteId, busId);
            if (busRouteTrips == null)
            {
                return new List<BusRouteTripModel>();
            }
            return busRouteTrips.Select(x => new BusRouteTripModel
            {
                Id = x.Id,
                BusId = x.BusId,
                BusRouteId = x.BusRouteId,
                DepartureTime = x.DepartureTime,
                ArrivalTime = x.ArrivalTime,
                Price = x.Price,
                TotalHours = x.TotalHours,
                TotalMinutes = x.TotalMinutes
            }).ToList();
        }

        public async Task UpdateBusRouteTrip(UpdateBusRouteTripModel busRouteTripModel)
        {
            foreach (var time in busRouteTripModel.DepartureTimes)
            {
                Console.WriteLine(time.Hour);
                var busRouteTrip = await _busRouteTripRepository.FindByBusRouteIdBusIdAndTime(busRouteTripModel.BusRouteId, busRouteTripModel.BusId, time);
                if (busRouteTrip == null)
                {
                    var arrivalTime = time.AddHours(busRouteTripModel.TotalHours);
                    arrivalTime = arrivalTime.AddMinutes(busRouteTripModel.TotalMinutes);
                    var busRouteTripNew = new BusRouteTrip
                    {
                        BusId = busRouteTripModel.BusId,
                        BusRouteId = busRouteTripModel.BusRouteId,
                        DepartureTime = time,
                        ArrivalTime = arrivalTime,
                        Price = busRouteTripModel.Price,
                        TotalHours = busRouteTripModel.TotalHours,
                        TotalMinutes = busRouteTripModel.TotalMinutes
                    };
                    await _busRouteTripRepository.AddAsync(busRouteTripNew);
                }
                else
                {
                    busRouteTrip.Price = busRouteTripModel.Price;
                    busRouteTrip.ArrivalTime = busRouteTrip.DepartureTime.AddHours(busRouteTripModel.TotalHours).AddMinutes(busRouteTripModel.TotalMinutes);
                    busRouteTrip.DepartureTime = time;
                    busRouteTrip.TotalHours = busRouteTripModel.TotalHours;
                    busRouteTrip.TotalMinutes = busRouteTripModel.TotalMinutes;
                    await _busRouteTripRepository.UpdateAsync(busRouteTrip);
                }
            }
            var busRouteTrips = await _busRouteTripRepository.GetByBusRouteIdAndBusId(busRouteTripModel.BusRouteId, busRouteTripModel.BusId);
            if (busRouteTrips == null)
            {
                return;
            }
            foreach (var item in busRouteTrips)
            {
                if (!busRouteTripModel.DepartureTimes.Contains(item.DepartureTime))
                {
                    await _busRouteTripRepository.DeleteByIdAsync(item.Id);
                }
            }
        }
    }
}
