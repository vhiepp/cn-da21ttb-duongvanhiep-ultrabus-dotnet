using UltraBusAPI.Datas;
using UltraBusAPI.Models;

namespace UltraBusAPI.Repositories.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly MyDBContext _context;

        public UserRepository(MyDBContext _context)
        {
            this._context = _context;
        }

        public User? FindByEmail(string email)
        {
            return _context.Users.FirstOrDefault(x => x.Email == email);
        }

        public User? FindById(Guid id)
        {
            return _context.Users.FirstOrDefault(x => x.Id == id);
        }

        public User? FindByPhone(string phone)
        {
            return _context.Users.FirstOrDefault(x => x.PhoneNumber == phone);
        }

        public List<User> GetByEmail(string email)
        {
            return _context.Users.Where(x => x.Email.Contains(email)).ToList();
        }

        public List<User> GetByName(string name)
        {
            return _context.Users.Where(x => x.FirstName.Contains(name) || x.LastName.Contains(name)).ToList();
        }

        public List<User> GetByPhone(string phone)
        {
            return _context.Users.Where(x => x.PhoneNumber.Contains(phone)).ToList();
        }
    }
}
