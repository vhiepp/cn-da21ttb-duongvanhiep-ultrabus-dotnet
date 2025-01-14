using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using UltraBusAPI.Models;

namespace UltraBusAPI.Datas
{
    public enum GenderType
    {
        Male = 1,
        Female = 2,
        Other = 3
    }

    [Table("Users")]
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        [MaxLength(50)]
        public string? FirstName { get; set; } = string.Empty;

        [AllowNull]
        public string? LastName { get; set; }

        [Required]
        [MaxLength(10)]
        public GenderType Gender { get; set; }

        [AllowNull]
        public string? Email { get; set; }

        [AllowNull]
        public string? PhoneNumber { get; set; }

        [AllowNull]
        public int? RoleId { get; set; }

        public Role? Role { get; set; } = null;

        public bool IsSuperAdmin { get; set; } = false;

        public bool IsCustomer { get; set; } = true;

        [AllowNull]
        public int? WardId { get; set; } = null;
        public Ward? Ward { get; set; } = null;

        [AllowNull]
        public int? DistrictId { get; set; } = null;
        public District? District { get; set; } = null;

        [AllowNull]
        public int? ProvinceId { get; set; } = null;
        public Province? Province { get; set; } = null;

        [AllowNull]
        public string? Address { get; set; }

        public List<Ticket>? Tickets { get; set; } = null;

        public User()
        {
            UserName = "";
            Password = "";
        }
    }
}
