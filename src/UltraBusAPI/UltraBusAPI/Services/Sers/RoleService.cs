using UltraBusAPI.Datas;
using UltraBusAPI.Models;
using UltraBusAPI.Repositories;

namespace UltraBusAPI.Services.Sers
{
    public class RoleService : IRoleService
    {
        public readonly IRoleRepository _roleRepository;
        public readonly IRolePermissionRepository _rolePermissionRepository;
        public readonly IPermissionRepository _permissionRepository;

        public RoleService(IRoleRepository roleRepository, IRolePermissionRepository rolePermissionRepository, IPermissionRepository permissionRepository)
        {
            _roleRepository = roleRepository;
            _rolePermissionRepository = rolePermissionRepository;
            _permissionRepository = permissionRepository;
        }

        public Task Create(Role role)
        {
            throw new NotImplementedException();
        }

        public async Task CreateRoleGroup(CreateRoleModel roleModel)
        {
            var role = new Role()
            {
                Name = roleModel.Name
            };
            await _roleRepository.AddAsync(role);
            foreach (var permissionId in roleModel.PermissionIds)
            {
                var rolePermission = new RolePermission()
                {
                    RoleId = role.Id,
                    PermissionId = permissionId
                };
                await _rolePermissionRepository.AddAsync(rolePermission);
            }
        }

        public Task Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<RoleModel>> GetAll()
        {
            var roles = await _roleRepository.GetAll();
            return roles.Select(r => new RoleModel()
            {
                Id = r.Id,
                Name = r.Name
            }).ToList();
        }

        public async Task<List<PermissionModel>> GetAllPermission()
        {
            var permissions = await _permissionRepository.GetAllAsync();

            return permissions.Select(p => new PermissionModel()
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
            }).ToList();
        }

        public async Task<RoleModel?> GetById(int id)
        {
            var role = await _roleRepository.FindByIdAsync(id);
            if (role == null)
            {
                return null;
            }
            var rolePermissions = await _rolePermissionRepository.GetRolesAsync(role.Id);
            var permissions = new List<PermissionModel>();
            foreach (var item in rolePermissions)
            {
                var per = await _permissionRepository.FindByIdAsync(item.PermissionId);
                if (per != null)
                    permissions.Add(new PermissionModel
                    {
                        Id = per.Id,
                        Name = per.Name,
                        Description = per.Description
                    });
            }
            return new RoleModel()
            {
                Id = role.Id,                
                Name = role.Name,
                Permissions = permissions
            };
        }

        public Task Update(Role role)
        {
            throw new NotImplementedException();
        }
    }
}
