using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UltraBusAPI.Datas
{
    [Table("Roles")]
    public class Role
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(50)]
        public required string Name { get; set; }

        // List of Permissions in the Role
        public ICollection<RolePermission> RolePermissions { get; set; }
        public ICollection<User> Users { get; set; }
    }
}
