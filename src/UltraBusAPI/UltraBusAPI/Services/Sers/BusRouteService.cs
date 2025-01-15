using UltraBusAPI.Datas;
using UltraBusAPI.Models;
using UltraBusAPI.Repositories;

namespace UltraBusAPI.Services.Sers
{
    public class BusRouteService : IBusRouteService
    {
        private readonly IBusRouteRepository _busRouteRepository;
        private readonly IBusRouteStationRepository _busRouteStationRepository;
        private readonly IBusStationRepository _busStationRepository;
        private readonly IProvinceRepository _provinceRepository;
        private readonly IDistrictRepository _districtRepository;
        private readonly IWardRepository _wardRepository;

        public BusRouteService(
            IBusRouteRepository busRouteRepository,
            IBusRouteStationRepository busRouteStationRepository,
            IBusStationRepository busStationRepository,
            IProvinceRepository provinceRepository,
            IDistrictRepository districtRepository,
            IWardRepository wardRepository)
        {
            _busRouteRepository = busRouteRepository;
            _busRouteStationRepository = busRouteStationRepository;
            _busStationRepository = busStationRepository;
            _provinceRepository = provinceRepository;
            _districtRepository = districtRepository;
            _wardRepository = wardRepository;
        }

        public async Task CreateBusRoute(CreateBusRouteModel busRouteModel)
        {
            var startStation = await _busStationRepository.FindByIdAsync(busRouteModel.Stations[0]);
            var endStation = await _busStationRepository.FindByIdAsync(busRouteModel.Stations[busRouteModel.Stations.Count - 1]);
            var busRoute = new BusRoute
            {
                Price = busRouteModel.Price,
                Stations = busRouteModel.Stations,
                StartStationId = busRouteModel.Stations[0],
                EndStationId = busRouteModel.Stations[busRouteModel.Stations.Count - 1],
                ProvinceStartStationId = startStation != null ? startStation.ProvinceId : null,
                ProvinceEndStationId = endStation != null ? endStation.ProvinceId : null
            };
            await _busRouteRepository.AddAsync(busRoute);
            for (int i = 0; i < busRouteModel.Stations.Count; i++)
            {
                var busRouteStation = new BusRouteStation
                {
                    BusRouteId = busRoute.Id,
                    BusStationId = busRouteModel.Stations[i]
                };
                await _busRouteStationRepository.AddAsync(busRouteStation);
            }
        }

        public async Task DeleteBusRoute(int id)
        {
            var busRoute = await _busRouteRepository.FindByIdAsync(id);
            if (busRoute != null)
            {
                await _busRouteRepository.DeleteByIdAsync(id);
            }
        }

        public async Task<BusRouteModel?> FindById(int id)
        {
            var busRoute = await _busRouteRepository.FindByIdAsync(id);
            if (busRoute == null)
            {
                return null;
            }
            List<BusStationModel> stations = new List<BusStationModel>();
            var busRouteStations = await _busRouteStationRepository.GetBusRouteStationsByBusRouteId(busRoute.Id);
            if (busRoute.Stations != null)
            {
                foreach (int busStationId in busRoute.Stations)
                {
                    var busStation = await _busStationRepository.FindByIdAsync(busStationId);
                
                    if (busStation != null)
                    {
                        ProvinceModel? provinceModel = null;
                        DistrictModel? districtModel = null;
                        WardModel? wardModel = null;
                        var province = await _provinceRepository.FindByIdAsync(busStation.ProvinceId);
                        if (province != null) {
                            provinceModel = new ProvinceModel
                            {
                                Id = province.Id,
                                Name = province.Name,
                                NameEnglish = province.NameEnglish,
                                FullName = province.FullName,
                                FullNameEnglish = province.FullNameEnglish,
                                Latitude = province.Latitude,
                                Longitude = province.Longitude
                            };
                        }
                        var district = await _districtRepository.FindByIdAsync(busStation.DistrictId);
                        if (district != null) {
                            districtModel = new DistrictModel
                            {
                                Id = district.Id,
                                Name = district.Name,
                                NameEnglish = district.NameEnglish,
                                FullName = district.FullName,
                                FullNameEnglish = district.FullNameEnglish,
                                Latitude = district.Latitude,
                                Longitude = district.Longitude
                            };
                        }
                        var ward = await _wardRepository.FindByIdAsync(busStation.WardId);
                        if (ward != null) {
                            wardModel = new WardModel
                            {
                                Id = ward.Id,
                                Name = ward.Name,
                                NameEnglish = ward.NameEnglish,
                                FullName = ward.FullName,
                                FullNameEnglish = ward.FullNameEnglish,
                                Latitude = ward.Latitude,
                                Longitude = ward.Longitude
                            };
                        }
                        stations.Add(new BusStationModel
                        {
                            Id = busStation.Id,
                            Name = busStation.Name,
                            ProvinceId = busStation.ProvinceId,
                            DistrictId = busStation.DistrictId,
                            WardId = busStation.WardId,
                            Address = busStation.Address,
                            Latitude = busStation.Latitude,
                            Longitude = busStation.Longitude,
                            Province = provinceModel,
                            District = districtModel,
                            Ward = wardModel
                        });
                    }
                }

            }
            var startStation = await _busStationRepository.FindByIdAsync(busRoute.StartStationId);
            var endStation = await _busStationRepository.FindByIdAsync(busRoute.EndStationId);
            if (startStation == null || endStation == null)
            {
                return null;
            }
            ProvinceModel? startProvinceModel = null;
            DistrictModel? startDistrictModel = null;
            WardModel? startWardModel = null;
            ProvinceModel? endProvinceModel = null;
            DistrictModel? endDistrictModel = null;
            WardModel? endWardModel = null;
            var startProvince = await _provinceRepository.FindByIdAsync(startStation.ProvinceId);
            var endProvince = await _provinceRepository.FindByIdAsync(endStation.ProvinceId);
            if (startProvince != null)
            {
                startProvinceModel = new ProvinceModel
                {
                    Id = startProvince.Id,
                    Name = startProvince.Name,
                    NameEnglish = startProvince.NameEnglish,
                    FullName = startProvince.FullName,
                    FullNameEnglish = startProvince.FullNameEnglish,
                    Latitude = startProvince.Latitude,
                    Longitude = startProvince.Longitude
                };
            }
            if (endProvince != null)
            {
                endProvinceModel = new ProvinceModel
                {
                    Id = endProvince.Id,
                    Name = endProvince.Name,
                    NameEnglish = endProvince.NameEnglish,
                    FullName = endProvince.FullName,
                    FullNameEnglish = endProvince.FullNameEnglish,
                    Latitude = endProvince.Latitude,
                    Longitude = endProvince.Longitude
                };
            }
            var startDistrict = await _districtRepository.FindByIdAsync(startStation.DistrictId);
            var endDistrict = await _districtRepository.FindByIdAsync(endStation.DistrictId);
            if (startDistrict != null)
            {
                startDistrictModel = new DistrictModel
                {
                    Id = startDistrict.Id,
                    Name = startDistrict.Name,
                    NameEnglish = startDistrict.NameEnglish,
                    FullName = startDistrict.FullName,
                    FullNameEnglish = startDistrict.FullNameEnglish,
                    Latitude = startDistrict.Latitude,
                    Longitude = startDistrict.Longitude
                };
            }
            if (endDistrict != null)
            {
                endDistrictModel = new DistrictModel
                {
                    Id = endDistrict.Id,
                    Name = endDistrict.Name,
                    NameEnglish = endDistrict.NameEnglish,
                    FullName = endDistrict.FullName,
                    FullNameEnglish = endDistrict.FullNameEnglish,
                    Latitude = endDistrict.Latitude,
                    Longitude = endDistrict.Longitude
                };
            }
            var startWard = await _wardRepository.FindByIdAsync(startStation.WardId);
            var endWard = await _wardRepository.FindByIdAsync(endStation.WardId);
            if (startWard != null)
            {
                startWardModel = new WardModel
                {
                    Id = startWard.Id,
                    Name = startWard.Name,
                    NameEnglish = startWard.NameEnglish,
                    FullName = startWard.FullName,
                    FullNameEnglish = startWard.FullNameEnglish,
                    Latitude = startWard.Latitude,
                    Longitude = startWard.Longitude
                };
            }
            if (endWard != null)
            {
                endWardModel = new WardModel
                {
                    Id = endWard.Id,
                    Name = endWard.Name,
                    NameEnglish = endWard.NameEnglish,
                    FullName = endWard.FullName,
                    FullNameEnglish = endWard.FullNameEnglish,
                    Latitude = endWard.Latitude,
                    Longitude = endWard.Longitude
                };
            }
            return new BusRouteModel
            {
                Id = busRoute.Id,
                Price = busRoute.Price,
                Stations = stations,
                StartStation = new BusStationModel
                {
                    Id = startStation.Id,
                    Name = startStation.Name,
                    ProvinceId = startStation.ProvinceId,
                    DistrictId = startStation.DistrictId,
                    WardId = startStation.WardId,
                    Address = startStation.Address,
                    Latitude = startStation.Latitude,
                    Longitude = startStation.Longitude,
                    Province = startProvinceModel,
                    District = startDistrictModel,
                    Ward = startWardModel
                },
                EndStation = new BusStationModel
                {
                    Id = endStation.Id,
                    Name = endStation.Name,
                    ProvinceId = endStation.ProvinceId,
                    DistrictId = endStation.DistrictId,
                    WardId = endStation.WardId,
                    Address = endStation.Address,
                    Latitude = endStation.Latitude,
                    Longitude = endStation.Longitude,
                    Province = endProvinceModel,
                    District = endDistrictModel,
                    Ward = endWardModel
                }
            };
        }

        public async Task<List<BusRouteModel>> GetAll()
        {
            var busRoutes = await _busRouteRepository.GetAllAsync();
            List<BusRouteModel> busRouteModels = new List<BusRouteModel>();
            foreach (var busRoute in busRoutes)
            {
                List<BusStationModel> stations = new List<BusStationModel>();
                var busRouteStations = await _busRouteStationRepository.GetBusRouteStationsByBusRouteId(busRoute.Id);
                foreach (var busRouteStation in busRouteStations)
                {
                    var busStation = await _busStationRepository.FindByIdAsync(busRouteStation.BusStationId);
                    if (busStation != null)
                    {
                        stations.Add(new BusStationModel
                        {
                            Id = busStation.Id,
                            Name = busStation.Name,
                            ProvinceId = busStation.ProvinceId,
                            DistrictId = busStation.DistrictId,
                            WardId = busStation.WardId,
                            Address = busStation.Address,
                            Latitude = busStation.Latitude,
                            Longitude = busStation.Longitude,
                        });
                    }
                }
                var startStation = await _busStationRepository.FindByIdAsync(busRoute.StartStationId);
                var endStation = await _busStationRepository.FindByIdAsync(busRoute.EndStationId);
                if (startStation == null || endStation == null)
                {
                    continue;
                }
                ProvinceModel? startProvinceModel = null;
                DistrictModel? startDistrictModel = null;
                WardModel? startWardModel = null;
                ProvinceModel? endProvinceModel = null;
                DistrictModel? endDistrictModel = null;
                WardModel? endWardModel = null;
                var startProvince = await _provinceRepository.FindByIdAsync(startStation.ProvinceId);
                var endProvince = await _provinceRepository.FindByIdAsync(endStation.ProvinceId);
                if (startProvince != null)
                {
                    startProvinceModel = new ProvinceModel
                    {
                        Id = startProvince.Id,
                        Name = startProvince.Name,
                        NameEnglish = startProvince.NameEnglish,
                        FullName = startProvince.FullName,
                        FullNameEnglish = startProvince.FullNameEnglish,
                        Latitude = startProvince.Latitude,
                        Longitude = startProvince.Longitude
                    };
                }
                if (endProvince != null) {
                    endProvinceModel = new ProvinceModel
                    {
                        Id = endProvince.Id,
                        Name = endProvince.Name,
                        NameEnglish = endProvince.NameEnglish,
                        FullName = endProvince.FullName,
                        FullNameEnglish = endProvince.FullNameEnglish,
                        Latitude = endProvince.Latitude,
                        Longitude = endProvince.Longitude
                    };
                }
                var startDistrict = await _districtRepository.FindByIdAsync(startStation.DistrictId);
                var endDistrict = await _districtRepository.FindByIdAsync(endStation.DistrictId);
                if (startDistrict != null) {
                    startDistrictModel = new DistrictModel
                    {
                        Id = startDistrict.Id,
                        Name = startDistrict.Name,
                        NameEnglish = startDistrict.NameEnglish,
                        FullName = startDistrict.FullName,
                        FullNameEnglish = startDistrict.FullNameEnglish,
                        Latitude = startDistrict.Latitude,
                        Longitude = startDistrict.Longitude
                    };
                }
                if (endDistrict  != null) {
                    endDistrictModel = new DistrictModel
                    {
                        Id = endDistrict.Id,
                        Name = endDistrict.Name,
                        NameEnglish = endDistrict.NameEnglish,
                        FullName = endDistrict.FullName,
                        FullNameEnglish = endDistrict.FullNameEnglish,
                        Latitude = endDistrict.Latitude,
                        Longitude = endDistrict.Longitude
                    };
                }
                var startWard = await _wardRepository.FindByIdAsync(startStation.WardId);
                var endWard = await _wardRepository.FindByIdAsync(endStation.WardId);
                if (startWard != null)
                {
                    startWardModel = new WardModel
                    {
                        Id = startWard.Id,
                        Name = startWard.Name,
                        NameEnglish = startWard.NameEnglish,
                        FullName = startWard.FullName,
                        FullNameEnglish = startWard.FullNameEnglish,
                        Latitude = startWard.Latitude,
                        Longitude = startWard.Longitude
                    };
                }
                if (endWard != null)
                {
                    endWardModel = new WardModel
                    {
                        Id = endWard.Id,
                        Name = endWard.Name,
                        NameEnglish = endWard.NameEnglish,
                        FullName = endWard.FullName,
                        FullNameEnglish = endWard.FullNameEnglish,
                        Latitude = endWard.Latitude,
                        Longitude = endWard.Longitude
                    };
                }
                busRouteModels.Add(new BusRouteModel
                {
                    Id = busRoute.Id,
                    Price = busRoute.Price,
                    Stations = stations,
                    StartStation = new BusStationModel
                    {
                        Id = startStation.Id,
                        Name = startStation.Name,
                        ProvinceId = startStation.ProvinceId,
                        DistrictId = startStation.DistrictId,
                        WardId = startStation.WardId,
                        Address = startStation.Address,
                        Latitude = startStation.Latitude,
                        Longitude = startStation.Longitude,
                        Province = startProvinceModel,
                        District = startDistrictModel,
                        Ward = startWardModel
                    },
                    EndStation = new BusStationModel
                    {
                        Id = endStation.Id,
                        Name = endStation.Name,
                        ProvinceId = endStation.ProvinceId,
                        DistrictId = endStation.DistrictId,
                        WardId = endStation.WardId,
                        Address = endStation.Address,
                        Latitude = endStation.Latitude,
                        Longitude = endStation.Longitude,
                        Province = endProvinceModel,
                        District = endDistrictModel,
                        Ward = endWardModel
                    }
                });
            }
            return busRouteModels;
        }

        public async Task UpdateBusRoute(int id, CreateBusRouteModel busRouteModel)
        {
            var busRoute = await _busRouteRepository.FindByIdAsync(id);
            if (busRoute != null)
            {
                var startStation = await _busStationRepository.FindByIdAsync(busRouteModel.Stations[0]);
                var endStation = await _busStationRepository.FindByIdAsync(busRouteModel.Stations[busRouteModel.Stations.Count - 1]);
                busRoute.Price = busRouteModel.Price;
                busRoute.Stations = busRouteModel.Stations;
                busRoute.StartStationId = busRouteModel.Stations[0];
                busRoute.EndStationId = busRouteModel.Stations[busRouteModel.Stations.Count - 1];
                if (startStation != null)
                {
                    busRoute.ProvinceStartStationId = startStation.ProvinceId;
                }
                if (endStation != null)
                {
                    busRoute.ProvinceEndStationId = endStation.ProvinceId;
                }
                await _busRouteRepository.UpdateAsync(busRoute);
                await _busRouteStationRepository.DeleteBusRouteStationByBusRouteId(busRoute.Id);
                
                for (int i = 0; i < busRouteModel.Stations.Count; i++)
                {
                    var busRouteStation = new BusRouteStation
                    {
                        BusRouteId = busRoute.Id,
                        BusStationId = busRouteModel.Stations[i]
                    };
                    await _busRouteStationRepository.AddAsync(busRouteStation);
                }
            }
        }
    }
}
