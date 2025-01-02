using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories
{
    public interface IDistrictRepository : IBaseRepository<District>
    {
        public Task<List<District>> GetDistrictByProvinceId(int provinceId);
    }
}
