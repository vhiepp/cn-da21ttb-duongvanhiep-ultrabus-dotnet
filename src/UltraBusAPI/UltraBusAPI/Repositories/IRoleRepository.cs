using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories
{
    public interface IRoleRepository
    {
        public Task<Role?> FindById(Guid id);
        public Task<Role?> FindByName(string name);
        public Task<List<Role>> GetAll();
        public Task<List<Role>> GetByName(string name);
        public Task AddRole(Role role);
        public void UpdateRole(Role role);
        public void DeleteRole(Role role);
    }
}
