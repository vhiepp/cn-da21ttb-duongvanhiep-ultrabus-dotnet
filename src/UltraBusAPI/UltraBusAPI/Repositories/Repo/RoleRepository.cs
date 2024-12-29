using Microsoft.EntityFrameworkCore;
using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories.Repo
{
    public class RoleRepository : IRoleRepository
    {
        private readonly MyDBContext _context;

        public RoleRepository(MyDBContext _context)
        {
            this._context = _context;
        }
        public async Task AddRole(Role role)
        {
            await _context.Roles.AddAsync(role);
            await _context.SaveChangesAsync();
        }

        public void DeleteRole(Role role)
        {
            _context.Roles.Remove(role);
            _context.SaveChanges();
        }

        public async Task<Role?> FindById(Guid id)
        {
            return await _context.Roles.FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<Role?> FindByName(string name)
        {
            return await _context.Roles.FirstOrDefaultAsync(r => r.Name == name);
        }

        public async Task<List<Role>> GetAll()
        {
           return await _context.Roles.ToListAsync();
        }

        public async Task<List<Role>> GetByName(string name)
        {
            return await _context.Roles.Where(r => r.Name.Contains(name)).ToListAsync();
        }

        public void UpdateRole(Role role)
        {
            _context.Roles.Update(role);
            _context.SaveChanges();
        }
    }
}
