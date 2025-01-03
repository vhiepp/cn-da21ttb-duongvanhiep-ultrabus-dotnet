using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories
{
    public interface IRolePermissionRepository : IBaseRepository<RolePermission>
    {
        public Task<List<RolePermission>> GetRolesAsync(int roleId);

        public Task<List<RolePermission>> GetPermissionsAsync(int permissionId);

        public Task<RolePermission?> GetRolePermissionAsync(int roleId, int permissionId);

        public Task DeleteByRoleId(int roleId);
    }
}
