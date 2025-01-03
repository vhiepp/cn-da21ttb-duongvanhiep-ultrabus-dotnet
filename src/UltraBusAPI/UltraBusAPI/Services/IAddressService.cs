using UltraBusAPI.Datas;
using UltraBusAPI.Models;

namespace UltraBusAPI.Services
{
    public interface IAddressService
    {
        public Task<List<ProvinceModel>> GetAllProvince();
        public Task<ProvinceModel?> GetProvinceById(int id);
        public Task<DistrictModel?> GetDistrictById(int id);
        public Task<List<DistrictModel>> GetDistrictByProvinceId(int provinceId);
        public Task<List<WardModel>> GetWardByDistrictId(int districtId);
    }
}
