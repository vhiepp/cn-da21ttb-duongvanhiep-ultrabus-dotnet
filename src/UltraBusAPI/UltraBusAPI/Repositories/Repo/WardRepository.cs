using Microsoft.EntityFrameworkCore;
using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories.Repo
{
    public class WardRepository : BaseRepository<Ward>, IWardRepository
    {
        public readonly MyDBContext _context;
        public readonly DbSet<Ward> _dbSet;
        public WardRepository(MyDBContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<Ward>();
        }

        public async Task<List<Ward>> GetWardByDistrictId(int districtId)
        {
            return await _dbSet.Where(x => x.DistrictId == districtId).ToListAsync();
        }
    }
}
