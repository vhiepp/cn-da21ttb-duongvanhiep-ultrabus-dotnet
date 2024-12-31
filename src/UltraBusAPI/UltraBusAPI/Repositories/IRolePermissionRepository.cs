using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories
{
    public interface IRolePermissionRepository : IBaseRepository<RolePermission>
    {
        public Task<List<RolePermission>> GetRolesAsync(Guid roleId);

        public Task<List<RolePermission>> GetPermissionsAsync(Guid permissionId);

        public Task<RolePermission?> GetRolePermissionAsync(Guid roleId, Guid permissionId);
    }
}
