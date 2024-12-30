using Microsoft.EntityFrameworkCore;
using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories.Repo
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        private readonly MyDBContext _context;
        private readonly DbSet<User> _dbSet;

        public UserRepository(MyDBContext context) : base(context)
        {
            this._context = context;
            this._dbSet = context.Set<User>();
        }

        public async Task<User?> FindByEmail(string email)
        {
            return await _dbSet.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User?> FindByPhone(string phone)
        {
            return await _dbSet.FirstOrDefaultAsync(u => u.PhoneNumber == phone);
        }

        public async Task<List<User>> GetAll()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<List<User>> GetByEmail(string email)
        {
            return await _dbSet.Where(u => u.Email.Contains(email)).ToListAsync();
        }

        public async Task<List<User>> GetByName(string name)
        {
            return await _dbSet.Where(u => u.FirstName.Contains(name) || u.LastName.Contains(name)).ToListAsync();
        }

        public async Task<List<User>> GetByPhone(string phone)
        {
            return await _dbSet.Where(u => u.PhoneNumber.Contains(phone)).ToListAsync();
        }
    }
}
