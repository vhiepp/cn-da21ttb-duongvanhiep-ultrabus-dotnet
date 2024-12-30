using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories
{
    public interface IUserRepository : IBaseRepository<User>
    {
        public Task<User?> FindByEmail(string email);

        public Task<User?> FindByPhone(string phone);

        public Task<List<User>> GetAll();

        public Task<List<User>> GetByName(string name);

        public Task<List<User>> GetByEmail(string email);

        public Task<List<User>> GetByPhone(string phone);
    }
}
