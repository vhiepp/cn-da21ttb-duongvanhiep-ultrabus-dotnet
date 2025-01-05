using UltraBusAPI.Datas.Seeders;

namespace UltraBusAPI.Configurations
{
    public class SeederConfig
    {
        public static void Run(IServiceProvider service)
        {
            // Gọi Seeder
            AddressSeeder.SeedData(service);
            PermissionSeeder.SeedData(service);
            UserSeeder.SeedData(service);
        }
    }
}
