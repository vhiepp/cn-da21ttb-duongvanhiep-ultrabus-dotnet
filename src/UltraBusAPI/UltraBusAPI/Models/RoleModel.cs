using UltraBusAPI.Datas;

namespace UltraBusAPI.Models
{
    public static class RoleDefaultTypes
    {
        public static Permission SuperAdmin = new Permission { Name = "Super Admin", KeyName = "SuperAdmin" };
        public static Permission Customer = new Permission { Name = "Khách hàng", KeyName = "Customer" };
    }
    public class RoleModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; } = null;
        public List<PermissionModel>? Permissions { get; set; } = [];
    }

    public class PermissionModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? KeyName { get; set; } = null;
        public string? Description { get; set; }
    }

    public class CreateRoleModel
    {
        public required string Name { get; set; }
        public string? Description { get; set; }
        public required List<int> PermissionIds { get; set; } = [];
    }
}
