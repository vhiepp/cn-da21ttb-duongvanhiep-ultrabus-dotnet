using Microsoft.EntityFrameworkCore;
using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories.Repo
{
    public class RolePermissionRepository : BaseRepository<RolePermission>, IRolePermissionRepository
    {
        private readonly MyDBContext _context;
        private readonly DbSet<RolePermission> _dbSet;

        public RolePermissionRepository(MyDBContext context) : base(context)
        {
            _context = context;
            _dbSet = context.Set<RolePermission>();
        }

        public async Task DeleteByRoleId(int roleId)
        {
            var rolePermissions = await _dbSet.Where(rp => rp.RoleId == roleId).ToListAsync();
            _dbSet.RemoveRange(rolePermissions);
            await _context.SaveChangesAsync();
        }

        public async Task<List<RolePermission>> GetPermissionsAsync(int permissionId)
        {
            return await _dbSet.Where(rp => rp.PermissionId == permissionId).ToListAsync();
        }

        public async Task<RolePermission?> GetRolePermissionAsync(int roleId, int permissionId)
        {
            return await _dbSet.FirstOrDefaultAsync(rp => rp.RoleId == roleId && rp.PermissionId == permissionId);
        }

        public async Task<List<RolePermission>> GetRolesAsync(int roleId)
        {
            return await _dbSet.Where(rp => rp.RoleId == roleId).ToListAsync();
        }
    }
}
