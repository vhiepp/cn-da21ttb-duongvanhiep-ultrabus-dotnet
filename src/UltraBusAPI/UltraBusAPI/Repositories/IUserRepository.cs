using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories
{
    public interface IUserRepository
    {
        public Task<User?> FindById(Guid id);

        public Task<User?> FindByEmail(string email);

        public Task<User?> FindByPhone(string phone);

        public Task<List<User>> GetAll();

        public Task<List<User>> GetByName(string name);

        public Task<List<User>> GetByEmail(string email);

        public Task<List<User>> GetByPhone(string phone);

        public Task AddUser(User user);

        public void UpdateUser(User user);

        public void DeleteUser(User user);
    }
}
