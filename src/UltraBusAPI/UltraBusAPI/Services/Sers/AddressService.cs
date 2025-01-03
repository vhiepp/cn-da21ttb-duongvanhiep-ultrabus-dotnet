using UltraBusAPI.Models;
using UltraBusAPI.Repositories;

namespace UltraBusAPI.Services.Sers
{
    public class AddressService : IAddressService
    {
        public readonly IProvinceRepository _provinceRepository;
        public readonly IDistrictRepository _districtRepository;
        public readonly IWardRepository _wardRepository;

        public AddressService(IProvinceRepository provinceRepository, IDistrictRepository districtRepository, IWardRepository wardRepository)
        {
            _provinceRepository = provinceRepository;
            _districtRepository = districtRepository;
            _wardRepository = wardRepository;
        }

        public async Task<List<ProvinceModel>> GetAllProvince()
        {
            var provinces = await _provinceRepository.GetAllAsync();
            return provinces.Select(x => new ProvinceModel
            {
                Id = x.Id,
                Name = x.Name,
                NameEnglish = x.NameEnglish,
                FullName = x.FullName,
                FullNameEnglish = x.FullNameEnglish,
                Latitude = x.Latitude,
                Longitude = x.Longitude
            }).ToList();
        }

        public async Task<ProvinceModel?> GetProvinceById(int id)
        {
            var province = await _provinceRepository.FindByIdAsync(id);
            if (province == null)
            {
                return null;
            }
            return new ProvinceModel
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

        public async Task<DistrictModel?> GetDistrictById(int id)
        {
            var district = await _districtRepository.FindByIdAsync(id);
            if (district == null)
            {
                return null;
            }
            return new DistrictModel
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

        public async Task<List<DistrictModel>> GetDistrictByProvinceId(int provinceId)
        {
            var districts = await _districtRepository.GetDistrictByProvinceId(provinceId);
            return districts.Select(x => new DistrictModel
            {
                Id = x.Id,
                Name = x.Name,
                NameEnglish = x.NameEnglish,
                FullName = x.FullName,
                FullNameEnglish = x.FullNameEnglish,
                Latitude = x.Latitude,
                Longitude = x.Longitude
            }).ToList();
        }

        public async Task<List<WardModel>> GetWardByDistrictId(int districtId)
        {
            var wards = await _wardRepository.GetWardByDistrictId(districtId);
            return wards.Select(x => new WardModel
            {
                Id = x.Id,
                Name = x.Name,
                NameEnglish = x.NameEnglish,
                FullName = x.FullName,
                FullNameEnglish = x.FullNameEnglish,
                Latitude = x.Latitude,
                Longitude = x.Longitude
            }).ToList();
        }
    }
}
