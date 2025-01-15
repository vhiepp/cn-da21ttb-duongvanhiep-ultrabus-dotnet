using Microsoft.EntityFrameworkCore;
using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories.Repo
{
    public class BusRouteTripDateRepository : BaseRepository<BusRouteTripDate>, IBusRouteTripDateRepository
    {
        private readonly MyDBContext _context;
        private readonly DbSet<BusRouteTripDate> _dbSet;
        public BusRouteTripDateRepository(MyDBContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<BusRouteTripDate>();
        }

        public async Task<BusRouteTripDate?> FindByBusRouteTripDateAsync(int busRouteTripId, DateTime date)
        {
            return await _dbSet.FirstOrDefaultAsync(x => x.BusRouteTripId == busRouteTripId && x.DepartureDay.Year == date.Year && x.DepartureDay.Month == date.Month && x.DepartureDay.Day == date.Day);
        }
    }
}
