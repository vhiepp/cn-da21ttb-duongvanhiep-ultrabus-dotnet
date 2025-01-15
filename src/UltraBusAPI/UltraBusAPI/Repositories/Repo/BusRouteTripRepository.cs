using Microsoft.EntityFrameworkCore;
using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories.Repo
{
    public class BusRouteTripRepository : BaseRepository<BusRouteTrip>, IBusRouteTripRepository
    {
        private readonly MyDBContext _context;
        private readonly DbSet<BusRouteTrip> _dbSet;

        public BusRouteTripRepository(MyDBContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<BusRouteTrip>();
        }

        public async Task<BusRouteTrip?> FindByBusRouteIdBusIdAndTime(int busRouteId, int busId, DateTime time)
        {
            // time chỉ so sánh giờ và phút
            return await _dbSet.FirstOrDefaultAsync(x => x.BusRouteId == busRouteId && x.BusId == busId && x.DepartureTime.Hour == time.Hour && x.DepartureTime.Minute == time.Minute);
            //return await _dbSet.((x) => x.BusRouteId == busRouteId && x.BusId == busId && x.DepartureTime.Hour == time.Hour && x.DepartureTime.Minute == time.Minute);
        }

        public async Task<List<BusRouteTrip>> GetByBusRouteId(int busRouteId)
        {
            return await _dbSet.Where(x => x.BusRouteId == busRouteId).ToListAsync();
        }

        public async Task<List<BusRouteTrip>> GetByBusRouteIdAndBusId(int busRouteId, int busId)
        {
            return await _dbSet.Where(x => x.BusRouteId == busRouteId && x.BusId == busId).ToListAsync();
        }
    }
}
