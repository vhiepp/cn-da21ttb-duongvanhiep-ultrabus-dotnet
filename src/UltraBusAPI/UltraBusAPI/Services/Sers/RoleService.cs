using UltraBusAPI.Datas;
using UltraBusAPI.Repositories;

namespace UltraBusAPI.Services.Sers
{
    public class RoleService : IRoleService
    {
        public readonly IRoleRepository _roleRepository;

        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }
        public async Task<List<Role>> GetAll()
        {
            return await _roleRepository.GetAll();
        }
    }
}
