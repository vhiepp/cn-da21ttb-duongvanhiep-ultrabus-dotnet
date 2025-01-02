using UltraBusAPI.Repositories;
using UltraBusAPI.Repositories.Repo;
using UltraBusAPI.Services;
using UltraBusAPI.Services.Sers;

namespace UltraBusAPI.Configurations
{
    public class RepositoryConfig
    {
        public static void AddRepositorys(IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IRolePermissionRepository, RolePermissionRepository>();
        }
    }
}
