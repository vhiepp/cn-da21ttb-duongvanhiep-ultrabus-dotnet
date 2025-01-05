using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories.Repo
{
    public class BusRepository : BaseRepository<Bus>, IBusRepository
    {
        public BusRepository(MyDBContext context) : base(context)
        {
        }
    }
}
