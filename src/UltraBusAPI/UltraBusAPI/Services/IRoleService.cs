using UltraBusAPI.Datas;

namespace UltraBusAPI.Services
{
    public interface IRoleService
    {
        public Task<List<Role>> GetAll();
    }
}
