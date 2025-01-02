using Microsoft.EntityFrameworkCore;
using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories.Repo
{
    public class DistrictRepository : BaseRepository<District>, IDistrictRepository
    {
        public readonly MyDBContext _context;
        public readonly DbSet<District> _dbSet;
        public DistrictRepository(MyDBContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<District>();
        }

        public async Task<List<District>> GetDistrictByProvinceId(int provinceId)
        {
            return await _dbSet.Where(x => x.ProvinceId == provinceId).ToListAsync();
        }
    }
}
