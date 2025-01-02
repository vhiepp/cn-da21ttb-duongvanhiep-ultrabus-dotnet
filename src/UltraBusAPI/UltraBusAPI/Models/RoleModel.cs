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
    }
}
