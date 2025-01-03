using UltraBusAPI.Datas;
using UltraBusAPI.Models;

namespace UltraBusAPI.Services
{
    public interface IRoleService
    {
        public Task<List<RoleModel>> GetAll();
        public Task<RoleModel?> GetById(int id);
        public Task Create(Role role);
        public Task<List<PermissionModel>> GetAllPermission();
        public Task Delete(int id);
        public Task Update(Role role);
        public Task CreateRoleGroup(CreateRoleModel roleModel);
    }
}
