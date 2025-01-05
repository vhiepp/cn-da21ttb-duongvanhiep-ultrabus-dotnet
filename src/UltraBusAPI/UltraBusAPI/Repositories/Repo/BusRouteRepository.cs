using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories.Repo
{
    public class BusRouteRepository : BaseRepository<BusRoute>, IBusRouteRepository
    {
        public BusRouteRepository(MyDBContext context) : base(context)
        {
        }
    }
}
