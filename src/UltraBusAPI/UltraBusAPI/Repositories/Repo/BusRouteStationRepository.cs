using Microsoft.EntityFrameworkCore;
using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories.Repo
{
    public class BusRouteStationRepository : BaseRepository<BusRouteStation>, IBusRouteStationRepository
    {
        public readonly MyDBContext _context;
        public readonly DbSet<BusRouteStation> _dbSet;
        public BusRouteStationRepository(MyDBContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<BusRouteStation>();
        }

        public async Task DeleteBusRouteStationByBusRouteId(int busRouteId)
        {
            var busRouteStations = await _dbSet.Where(x => x.BusRouteId == busRouteId).ToListAsync();
            _dbSet.RemoveRange(busRouteStations);
        }

        public async Task<List<BusRouteStation>> GetBusRouteStationsByBusRouteId(int busRouteId)
        {
            return await _dbSet.Where(x => x.BusRouteId == busRouteId).ToListAsync();
        }

        public async Task<List<BusRouteStation>> GetBusRouteStationsByBusStationId(int busStationId)
        {
            return await _dbSet.Where(x => x.BusStationId == busStationId).ToListAsync();
        }
    }
}
