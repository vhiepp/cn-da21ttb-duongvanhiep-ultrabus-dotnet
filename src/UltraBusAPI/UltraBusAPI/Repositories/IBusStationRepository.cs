using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories
{
    public interface IBusStationRepository : IBaseRepository<BusStation>
    {
        public Task<List<BusStation>> GetByProvinceId(int provinceId);
    }
}
