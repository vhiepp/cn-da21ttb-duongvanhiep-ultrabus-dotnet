using Microsoft.EntityFrameworkCore;
using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories.Repo
{
    public class BusRouteRepository : BaseRepository<BusRoute>, IBusRouteRepository
    {
        private readonly MyDBContext _context;
        private readonly DbSet<BusRoute> _dbSet;

        public BusRouteRepository(MyDBContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<BusRoute>();
        }

        public async Task<List<BusRoute>> GetByProvinceStartEndStationId(int provinceStartStationId, int provinceEndStationId)
        {
            return await _dbSet.Where(x => x.ProvinceStartStationId == provinceStartStationId && x.ProvinceEndStationId == provinceEndStationId).ToListAsync();
        }

        public async Task<List<BusRoute>> GetByStartEndStationId(int startStationId, int endStationId)
        {
            return await _dbSet.Where(x => x.StartStationId == startStationId && x.EndStationId == endStationId).ToListAsync();
        }
    }
}
