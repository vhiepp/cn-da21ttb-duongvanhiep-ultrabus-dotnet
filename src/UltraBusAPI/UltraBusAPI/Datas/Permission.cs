using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace UltraBusAPI.Datas
{
    public class Permission
    {
        [Key]
        public int Id { get; set; }
        public required string? Name { get; set; }
        public required string? KeyName { get; set; }

        [AllowNull]
        public string? Description { get; set; }

        public ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
    }
}
