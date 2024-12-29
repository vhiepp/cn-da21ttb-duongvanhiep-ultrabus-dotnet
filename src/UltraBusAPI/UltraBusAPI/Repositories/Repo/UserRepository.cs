using Microsoft.EntityFrameworkCore;
using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly MyDBContext _context;

        public UserRepository(MyDBContext _context)
        {
            this._context = _context;
        }

        public async Task AddUser(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public void DeleteUser(User user)
        {
            _context.Users.Remove(user);
            _context.SaveChanges();
        }

        public async Task<User?> FindByEmail(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User?> FindById(Guid id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User?> FindByPhone(string phone)
        {
           return await _context.Users.FirstOrDefaultAsync(u => u.PhoneNumber == phone);
        }

        public async Task<List<User>> GetAll()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<List<User>> GetByEmail(string email)
        {
            return await _context.Users.Where(u => u.Email.Contains(email)).ToListAsync();
        }

        public async Task<List<User>> GetByName(string name)
        {
            return await _context.Users.Where(u => u.FirstName.Contains(name) || u.LastName.Contains(name)).ToListAsync();
        }

        public async Task<List<User>> GetByPhone(string phone)
        {
            return await _context.Users.Where(u => u.PhoneNumber.Contains(phone)).ToListAsync();
        }

        public void UpdateUser(User user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();
        }
    }
}
