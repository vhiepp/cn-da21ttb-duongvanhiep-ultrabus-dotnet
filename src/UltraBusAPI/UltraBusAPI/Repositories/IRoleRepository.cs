using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories
{
    public interface IRoleRepository : IBaseRepository<Role>
    {
        public Task<Role?> FindByName(string name);

        public Task<List<Role>> GetAll();

        public Task<List<Role>> GetByName(string name);
    }
}
