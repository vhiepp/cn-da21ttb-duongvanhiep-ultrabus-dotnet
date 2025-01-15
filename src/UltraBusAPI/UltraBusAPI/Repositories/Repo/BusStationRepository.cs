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

        public async Task<List<BusStation>> GetByProvinceId(int provinceId)
        {
            return await _dbSet.Where(x => x.ProvinceId == provinceId).ToListAsync();
        }
    }
}
