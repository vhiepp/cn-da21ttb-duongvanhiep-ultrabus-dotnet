using Microsoft.EntityFrameworkCore;
using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories.Repo
{
    public class RoleRepository : BaseRepository<Role>, IRoleRepository
    {
        private readonly MyDBContext _context;
        private readonly DbSet<Role> _dbSet;

        public RoleRepository(MyDBContext context) : base(context)
        {
            _context = context;
            _dbSet = context.Set<Role>();
        }

        public async Task<Role?> FindByName(string name)
        {
            return await _dbSet.FirstOrDefaultAsync(r => r.Name == name);
        }

        public async Task<List<Role>> GetAll()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<List<Role>> GetByName(string name)
        {
            return await _dbSet.Where(r => r.Name.Contains(name)).ToListAsync();
        }
    }
}
