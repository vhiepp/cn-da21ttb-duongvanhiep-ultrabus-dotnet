using Microsoft.AspNetCore.Http.HttpResults;
using System.Data;
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
                Name = roleModel.Name,
                Description = roleModel.Description
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

        public async Task Delete(int id)
        {
            await _rolePermissionRepository.DeleteByRoleId(id);
            await _roleRepository.DeleteByIdAsync(id);
        }

        public async Task<List<RoleModel>> GetAll()
        {
            var roles = await _roleRepository.GetAll();
            return roles.Select(r => new RoleModel()
            {
                Id = r.Id,
                Name = r.Name,
                Description = r.Description
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
                Description = role.Description,
                Permissions = permissions
            };
        }

        public async Task<List<PermissionModel>> GetPermissionByRoleId(int roleId)
        {
            var role = await _roleRepository.FindByIdAsync(roleId);
            if (role == null)
            {
                return [];
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
                        KeyName = per.KeyName,
                        Description = per.Description
                    });
            }
            return permissions;
        }

        public async Task Update(int roleId, CreateRoleModel roleModel)
        {
            await _roleRepository.UpdateAsync(new Role()
            {
                Id = roleId,
                Name = roleModel.Name,
                Description = roleModel.Description
            });
            await _rolePermissionRepository.DeleteByRoleId(roleId);
            foreach (var permissionId in roleModel.PermissionIds)
            {
                var rolePermission = new RolePermission()
                {
                    RoleId = roleId,
                    PermissionId = permissionId
                };
                await _rolePermissionRepository.AddAsync(rolePermission);
            }
        }
    }
}
