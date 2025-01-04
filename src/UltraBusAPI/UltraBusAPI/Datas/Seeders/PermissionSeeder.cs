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
                Name = "Quản lý trạm dừng",
                KeyName = "StationManager",
                Description = "Quản lý trạm dừng, bao gồm các quyền thêm, xóa, sửa thông tin trạm dừng."
            },
            new Permission
            {
                Name = "Quản lý tuyến đường",
                KeyName = "RouteManager",
                Description = "Quản lý tuyến xe, bao gồm các quyền thêm, xóa, sửa thông tin tuyến đường."
            },
            new Permission
            {
                Name = "Quản lý chuyến đi",
                KeyName = "TripManager",
                Description = "Quản lý chuyến đi, bao gồm xem thông tin hàng trình chuyến đi và hành khách."
            },
            new Permission
            {
                Name = "Quản lý khách hàng",
                KeyName = "CustomerManager",
                Description = "Quản lý khách hàng, bao gồm các quyền xem, thêm, xóa, sửa thông tin khách hàng."
            },
            new Permission
            {
                Name = "Quản lý vé xe",
                KeyName = "TicketManager",
                Description = "Quản lý vé xe."
            },
            new Permission
            {
                Name = "Quản lý đánh giá phản hồi",
                KeyName = "FeedbackManager",
                Description = "Quản lý đánh giá phản hồi của khách hàng, bao gồm xem và phản hồi ý kiến."
            },
        };
        public static void SeedData(IServiceProvider serviceProvider)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<MyDBContext>();

                // Đảm bảo cơ sở dữ liệu đã được tạo
                context.Database.EnsureCreated();

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
