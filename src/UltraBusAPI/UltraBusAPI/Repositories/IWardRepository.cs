using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories
{
    public interface IWardRepository : IBaseRepository<Ward>
    {
        public Task<List<Ward>> GetWardByDistrictId(int districtId);
    }
}
