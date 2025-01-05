using UltraBusAPI.Datas;
using UltraBusAPI.Models;
using UltraBusAPI.Repositories;

namespace UltraBusAPI.Services.Sers
{
    public class BusStationService : IBusStationService
    {
        private readonly IBusStationRepository _busStationRepository;
        private readonly IProvinceRepository _provinceRepository;
        private readonly IDistrictRepository _districtRepository;
        private readonly IWardRepository _wardRepository;

        public BusStationService(IBusStationRepository busStationRepository, IProvinceRepository provinceRepository, IDistrictRepository districtRepository, IWardRepository wardRepository)
        {
            _busStationRepository = busStationRepository;
            _provinceRepository = provinceRepository;
            _districtRepository = districtRepository;
            _wardRepository = wardRepository;
        }

        public async Task Create(CreateBusStationModel createBusStationModel)
        {
            BusStation busStation = new BusStation
            {
                Name = createBusStationModel.Name,
                ProvinceId = createBusStationModel.ProvinceId,
                DistrictId = createBusStationModel.DistrictId,
                WardId = createBusStationModel.WardId,
                Address = createBusStationModel.Address,
                Latitude = createBusStationModel.Latitude,
                Longitude = createBusStationModel.Longitude
            };
            await _busStationRepository.AddAsync(busStation);
        }

        public async Task Delete(int id)
        {
            var busStation = await _busStationRepository.FindByIdAsync(id);
            if (busStation != null)
            {
                await _busStationRepository.DeleteByIdAsync(id);
            }
        }

        public async Task<List<BusStationModel>> GetBusStationAsync()
        {
            var busStations = await _busStationRepository.GetAllAsync();
            List<BusStationModel> busStationModels = new List<BusStationModel>();
            foreach (var busStation in busStations)
            {
                ProvinceModel? provinceModel = null;
                DistrictModel? districtModel = null;
                WardModel? wardModel = null;
                if (busStation.ProvinceId != null)
                {
                    var province = await _provinceRepository.FindByIdAsync(busStation.ProvinceId.Value);
                    if (province != null)
                    {
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
                }
                if (busStation.DistrictId != null)
                {
                    var district = await _districtRepository.FindByIdAsync(busStation.DistrictId.Value);
                    if (district != null)
                    {
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
                }
                if (busStation.WardId != null)
                {
                    var ward = await _wardRepository.FindByIdAsync(busStation.WardId.Value);
                    if (ward != null)
                    {
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
                }
                BusStationModel busStationModel = new BusStationModel
                {
                    Id = busStation.Id,
                    Name = busStation.Name,
                    ProvinceId = busStation.ProvinceId,
                    DistrictId = busStation.DistrictId,
                    WardId = busStation.WardId,
                    Address = busStation.Address,
                    Latitude = busStation.Latitude,
                    Longitude = busStation.Longitude,
                    Ward = wardModel,
                    District = districtModel,
                    Province = provinceModel
                };
                busStationModels.Add(busStationModel);
            }
            return busStationModels;
        }


    }
}
