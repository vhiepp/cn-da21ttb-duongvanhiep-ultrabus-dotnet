namespace UltraBusAPI.Datas
{
    public class Permission
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }

        public ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
    }
}
