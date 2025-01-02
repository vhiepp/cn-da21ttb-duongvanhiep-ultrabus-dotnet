namespace UltraBusAPI.Datas.Seeders
{
    public static class PermissionSeeder
    {
        public static List<Permission> permissions = new List<Permission>
        {
            new Permission
            {
                Name = "Quản lý xe",
                KeyName = "CarManager",
                Description = "Quản lý xe khách, bao gồm các quyền thêm, xóa, sửa thông tin xe."
            },
            new Permission
            {
                Name = "Quản lý tuyến đường",
                KeyName = "RouteManager",
                Description = "Quản lý tuyến xe, bao gồm các quyền thêm, xóa, sửa thông tin tuyến đường."
            },
            new Permission
            {
                Name = "Quản lý trạm dừng",
                KeyName = "StationManager",
                Description = "Quản lý trạm dừng, bao gồm các quyền thêm, xóa, sửa thông tin trạm dừng."
            },
        };
        public static void SeedData(IServiceProvider serviceProvider)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<MyDBContext>();

                // Đảm bảo cơ sở dữ liệu đã được tạo
                context.Database.EnsureCreated();

                // Kiểm tra nếu bảng đã có dữ liệu
                if (!context.Permissions.Any())
                {
                    foreach (var permission in permissions)
                    {
                        if (!context.Permissions.Any(p => p.KeyName == permission.KeyName))
                        {
                            context.Permissions.Add(permission);
                            context.SaveChanges();
                        }
                    }
                }
            }
        }
    }
}
