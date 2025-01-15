using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories
{
    public interface IBusRouteRepository : IBaseRepository<BusRoute>
    {
        public Task<List<BusRoute>> GetByStartEndStationId(int startStationId, int endStationId);
        public Task<List<BusRoute>> GetByProvinceStartEndStationId(int provinceStartStationId, int provinceEndStationId);
    }
}
