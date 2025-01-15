using System.Text.Json;
using UltraBusAPI.Datas;
using UltraBusAPI.Models;
using UltraBusAPI.Repositories;

namespace UltraBusAPI.Services.Sers
{
    public class BusRouteTripService : IBusRouteTripService
    {
        private readonly IBusRouteTripRepository _busRouteTripRepository;
        private readonly IBusRouteRepository _busRouteRepository;
        private readonly IBusStationRepository _busStationRepository;
        private readonly IBusRouteTripDateRepository _busRouteTripDateRepository;
        private readonly IBusRepository _busRepository;
        private readonly IProvinceRepository _provinceRepository;
        private readonly IDistrictRepository _districtRepository;
        private readonly IWardRepository _wardRepository;
        private readonly ITicketRepository _ticketRepository;

        public BusRouteTripService(
            IBusRouteTripRepository busRouteTripRepository,
            IBusRouteRepository busRouteRepository,
            IBusStationRepository busStationRepository,
            IBusRepository busRepository,
            IProvinceRepository provinceRepository,
            IDistrictRepository districtRepository,
            IWardRepository wardRepository,
            IBusRouteTripDateRepository busRouteTripDateRepository,
            ITicketRepository ticketRepository)
        {
            _busRouteTripRepository = busRouteTripRepository;
            _busRouteRepository = busRouteRepository;
            _busStationRepository = busStationRepository;
            _busRepository = busRepository;
            _provinceRepository = provinceRepository;
            _districtRepository = districtRepository;
            _wardRepository = wardRepository;
            _busRouteTripDateRepository = busRouteTripDateRepository;
            _ticketRepository = ticketRepository;
        }

        public async Task<BusRouteTripModel> FindById(int id, DateTime date)
        {
            var busRouteTrip = await _busRouteTripRepository.FindByIdAsync(id);
            if (busRouteTrip == null)
            {
                return new BusRouteTripModel();
            }
            var busTripDate = await _busRouteTripDateRepository.FindByBusRouteTripDateAsync(busRouteTrip.Id, date);
            List<string> seatSeleted = [];
            if (busTripDate != null)
            {
                var tickets = await _ticketRepository.GetByBusRouteTripDateId(busTripDate.Id);
                if (tickets != null)
                {
                    foreach (var tk in tickets)
                    {
                        if (tk.IsPaid || tk.ExpriedTime > DateTime.Now)
                        {
                            seatSeleted.AddRange(tk.SeatNumbers);
                        }
                    }
                }
            }
            var bus = await _busRepository.FindByIdAsync(busRouteTrip.BusId);
            BusModel? busModel = null;
            if (bus != null) {
                busModel = new BusModel
                {
                    Id = bus.Id,
                    Name = bus.Name,
                    BrandName = bus.BrandName,
                    BusType = bus.BusType,
                    Description = bus.Description,
                    Floor = bus.Floor,
                    SeatArrangement = JsonSerializer.Deserialize<List<List<List<string>>>>(bus.SeatArrangement != null ? bus.SeatArrangement : ""),
                    SeatCount = bus.SeatCount
                };
            }
            var busRoute = await _busRouteRepository.FindByIdAsync(busRouteTrip.BusRouteId);
            BusRouteModel? busRouteModel = null;
            if (busRoute != null) {
                busRouteModel = new BusRouteModel
                {
                    Id = busRoute.Id
                };
                var startStation = await _busStationRepository.FindByIdAsync(busRoute.StartStationId);
                var endStation = await _busStationRepository.FindByIdAsync(busRoute.EndStationId);
                BusStationModel? startStationModel = null;
                BusStationModel? endStationModel = null;
                if (startStation != null)
                {
                    var province = await _provinceRepository.FindByIdAsync(startStation.ProvinceId);
                    var district = await _districtRepository.FindByIdAsync(startStation.DistrictId);
                    var ward = await _wardRepository.FindByIdAsync(startStation.WardId);
                    startStationModel = new BusStationModel
                    {
                        Id = startStation.Id,
                        Name = startStation.Name,
                        ProvinceId = startStation.ProvinceId,
                        Address = startStation.Address,
                        Province = new ProvinceModel
                        {
                            Id = province.Id,
                            Name = province.Name,
                            NameEnglish = province.NameEnglish,
                            FullName = province.FullName,
                            FullNameEnglish = province.FullNameEnglish
                        },
                        District = new DistrictModel
                        {
                            Id = district.Id,
                            Name = district.Name,
                            NameEnglish = district.NameEnglish,
                            FullName = district.FullName,
                            FullNameEnglish = district.FullNameEnglish
                        },
                        Ward = new WardModel
                        {
                            Id = ward.Id,
                            Name = ward.Name,
                            NameEnglish = ward.NameEnglish,
                            FullName = ward.FullName,
                            FullNameEnglish = ward.FullNameEnglish
                        }
                    };
                }
                if (endStation != null)
                {
                    var province = await _provinceRepository.FindByIdAsync(endStation.ProvinceId);
                    var district = await _districtRepository.FindByIdAsync(endStation.DistrictId);
                    var ward = await _wardRepository.FindByIdAsync(endStation.WardId);
                    endStationModel = new BusStationModel
                    {
                        Id = endStation.Id,
                        Name = endStation.Name,
                        ProvinceId = endStation.ProvinceId,
                        Address = endStation.Address,
                        Province = new ProvinceModel
                        {
                            Id = province.Id,
                            Name = province.Name,
                            NameEnglish = province.NameEnglish,
                            FullName = province.FullName,
                            FullNameEnglish = province.FullNameEnglish
                        },
                        District = new DistrictModel
                        {
                            Id = district.Id,
                            Name = district.Name,
                            NameEnglish = district.NameEnglish,
                            FullName = district.FullName,
                            FullNameEnglish = district.FullNameEnglish
                        },
                        Ward = new WardModel
                        {
                            Id = ward.Id,
                            Name = ward.Name,
                            NameEnglish = ward.NameEnglish,
                            FullName = ward.FullName,
                            FullNameEnglish = ward.FullNameEnglish
                        }
                    };
                }
                List<BusStationModel>? stations = null;
                if (busRoute.Stations != null)
                {
                    foreach (var station in busRoute.Stations)
                    {
                        var stationTemp = await _busStationRepository.FindByIdAsync(station);
                        if (stationTemp != null)
                        {
                            var province = await _provinceRepository.FindByIdAsync(stationTemp.ProvinceId);
                            var district = await _districtRepository.FindByIdAsync(stationTemp.DistrictId);
                            var ward = await _wardRepository.FindByIdAsync(stationTemp.WardId);
                            if (stations == null)
                            {
                                stations = new List<BusStationModel>();
                            }
                            stations.Add(new BusStationModel
                            {
                                Id = stationTemp.Id,
                                Name = stationTemp.Name,
                                ProvinceId = stationTemp.ProvinceId,
                                Address = stationTemp.Address,
                                Province = new ProvinceModel
                                {
                                    Id = province.Id,
                                    Name = province.Name,
                                    NameEnglish = province.NameEnglish,
                                    FullName = province.FullName,
                                    FullNameEnglish = province.FullNameEnglish
                                },
                                District = new DistrictModel
                                {
                                    Id = district.Id,
                                    Name = district.Name,
                                    NameEnglish = district.NameEnglish,
                                    FullName = district.FullName,
                                    FullNameEnglish = district.FullNameEnglish
                                },
                                Ward = new WardModel
                                {
                                    Id = ward.Id,
                                    Name = ward.Name,
                                    NameEnglish = ward.NameEnglish,
                                    FullName = ward.FullName,
                                    FullNameEnglish = ward.FullNameEnglish
                                }
                            });
                        }
                    }
                }
                busRouteModel.StartStation = startStationModel;
                busRouteModel.EndStation = endStationModel;
                busRouteModel.Stations = stations;
            }
            return new BusRouteTripModel
            {
                Id = busRouteTrip.Id,
                BusId = busRouteTrip.BusId,
                BusRouteId = busRouteTrip.BusRouteId,
                DepartureTime = busRouteTrip.DepartureTime,
                ArrivalTime = busRouteTrip.ArrivalTime,
                Price = busRouteTrip.Price,
                TotalHours = busRouteTrip.TotalHours,
                TotalMinutes = busRouteTrip.TotalMinutes,
                Bus = busModel,
                BusRoute = busRouteModel,
                SeatSelectds = seatSeleted
            };
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

        public async Task<List<BusRouteTripModel>> SearchBusRouteTrips(SearchBusRouteTripsModel searchBusRouteTrips)
        {
            var busRoutes = await _busRouteRepository.GetByProvinceStartEndStationId(searchBusRouteTrips.StartProvinceId, searchBusRouteTrips.EndProvinceId);
            if (busRoutes == null)
            {
                return new List<BusRouteTripModel>();
            }
            var busRouteTrips = new List<BusRouteTripModel>();
            foreach (var busRoute in busRoutes)
            {
                var startStation = await _busStationRepository.FindByIdAsync(busRoute.StartStationId);
                var endStation = await _busStationRepository.FindByIdAsync(busRoute.EndStationId);
                BusStationModel? startStationModel = null;
                BusStationModel? endStationModel = null;
                if (startStation != null)
                {
                    startStationModel = new BusStationModel
                    {
                        Id = startStation.Id,
                        Name = startStation.Name,
                        ProvinceId = startStation.ProvinceId
                    };
                }
                if (endStation != null)
                {
                    endStationModel = new BusStationModel
                    {
                        Id = endStation.Id,
                        Name = endStation.Name,
                        ProvinceId = endStation.ProvinceId
                    };
                }
                var busRouteTripsTemp = await _busRouteTripRepository.GetByBusRouteId(busRoute.Id);
                if (busRouteTripsTemp == null)
                {
                    continue;
                }
                foreach (var busRouteTrip in busRouteTripsTemp)
                {
                    var busRouteTripDate = await _busRouteTripDateRepository.FindByBusRouteTripDateAsync(busRouteTrip.Id, (DateTime)searchBusRouteTrips.Date);
                    int totalSeatEmptys = 0;
                    if (busRouteTripDate != null)
                    {
                        var tickets = await _ticketRepository.GetByBusRouteTripDateId(busRouteTripDate.Id);
                        if (tickets != null)
                        {
                            foreach (var tk in tickets)
                            {
                                if (tk.IsPaid || tk.ExpriedTime > DateTime.Now)
                                {
                                    totalSeatEmptys += (int)tk.ToTalSeats;
                                }
                            }
                        }
                    }
                    // DepartureTime phải lớn hơn giờ hiện tại 1 tiếng
                    var nowTime = DateTime.Now.AddHours(1);
                    if (nowTime.Date < searchBusRouteTrips.Date || busRouteTrip.DepartureTime.Hour > nowTime.Hour)
                    {
                        var bus = await _busRepository.FindByIdAsync(busRouteTrip.BusId);
                        BusModel? busModel = null;
                        if (bus != null)
                        {
                            busModel = new BusModel
                            {
                                Id = bus.Id,
                                Name = bus.Name,
                                BrandName = bus.BrandName,
                                BusType = bus.BusType,
                                Description = bus.Description,
                                Floor = bus.Floor,
                                //SeatArrangement = JsonSerializer.Deserialize<List<List<List<string>>>>(bus.SeatArrangement != null ? bus.SeatArrangement : ""),
                                SeatCount = bus.SeatCount
                            };
                        }
                        busRouteTrips.Add(new BusRouteTripModel
                        {
                            Id = busRouteTrip.Id,
                            BusId = busRouteTrip.BusId,
                            BusRouteId = busRouteTrip.BusRouteId,
                            DepartureTime = busRouteTrip.DepartureTime,
                            ArrivalTime = busRouteTrip.ArrivalTime,
                            Price = busRouteTrip.Price,
                            TotalHours = busRouteTrip.TotalHours,
                            TotalMinutes = busRouteTrip.TotalMinutes,
                            Bus = busModel,
                            StartStation = startStationModel,
                            EndStation = endStationModel,
                            TotalSeatEmptys = (int)busModel.SeatCount - totalSeatEmptys
                        });
                    } 
                }
            }
            return busRouteTrips;
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
