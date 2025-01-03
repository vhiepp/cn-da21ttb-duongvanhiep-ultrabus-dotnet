using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories.Repo
{
    public class PermissionRepository : BaseRepository<Permission>, IPermissionRepository
    {
        public PermissionRepository(MyDBContext context) : base(context)
        {
        }
    }
}
