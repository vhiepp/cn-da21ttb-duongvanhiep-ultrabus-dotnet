using Microsoft.EntityFrameworkCore;
using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories.Repo
{
    public class BusStationRepository : BaseRepository<BusStation>, IBusStationRepository
    {
        public readonly MyDBContext _context;
        public readonly DbSet<BusStation> _dbSet;
        public BusStationRepository(MyDBContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<BusStation>();
        }
    }
}
