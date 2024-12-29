using UltraBusAPI.Repositories;
using UltraBusAPI.Repositories.Repo;

namespace UltraBusAPI.Configurations
{
    public class RepositoryConfig
    {
        public static void AddRepositorys(IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
        }
    }
}
