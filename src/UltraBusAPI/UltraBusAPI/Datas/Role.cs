using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace UltraBusAPI.Datas
{
    [Table("Roles")]
    public class Role
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public required string Name { get; set; }

        [AllowNull]
        public string? Description { get; set; }

        // List of Permissions in the Role
        public ICollection<RolePermission>? RolePermissions { get; set; }
        public ICollection<User>? Users { get; set; }
    }
}
