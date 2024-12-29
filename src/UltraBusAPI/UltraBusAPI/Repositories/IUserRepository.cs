using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories
{
    public interface IUserRepository
    {
        public User? FindById(Guid id);
            
        public User? FindByEmail(string email);

        public User? FindByPhone(string phone);

        public List<User> GetByName(string name);

        public List<User> GetByEmail(string email);

        public List<User> GetByPhone(string phone);
    }
}
