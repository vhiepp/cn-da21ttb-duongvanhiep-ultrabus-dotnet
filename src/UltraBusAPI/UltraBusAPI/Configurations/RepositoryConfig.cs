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
            services.AddScoped<IPermissionRepository, PermissionRepository>();
            services.AddScoped<IProvinceRepository, ProvinceRepository>();
            services.AddScoped<IDistrictRepository, DistrictRepository>();
            services.AddScoped<IWardRepository, WardRepository>();
            services.AddScoped<IBusRepository, BusRepository>();
            services.AddScoped<IBusRouteRepository, BusRouteRepository>();
            services.AddScoped<IBusStationRepository, BusStationRepository>();
            services.AddScoped<IBusRouteStationRepository, BusRouteStationRepository>();
            services.AddScoped<IBusRouteTripRepository, BusRouteTripRepository>();
            services.AddScoped<IBusRouteTripDateRepository, BusRouteTripDateRepository>();
            services.AddScoped<ITicketRepository, TicketRepository>();
            services.AddScoped<IOTPRepository, OTPRepository>();
        }
    }
}
