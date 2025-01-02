using UltraBusAPI.Services;
using UltraBusAPI.Services.Sers;

namespace UltraBusAPI.Configurations
{
    public class ServiceConfig
    {
        public static void AddServices(IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<IAddressService, AddressService>();
        }
    }
}
