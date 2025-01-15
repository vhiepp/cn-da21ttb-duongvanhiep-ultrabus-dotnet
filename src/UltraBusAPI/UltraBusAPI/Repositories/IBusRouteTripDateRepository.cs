using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories
{
    public interface IBusRouteTripDateRepository : IBaseRepository<BusRouteTripDate>
    {
        public Task<BusRouteTripDate?> FindByBusRouteTripDateAsync(int busRouteTripId, DateTime date);
    }
}
