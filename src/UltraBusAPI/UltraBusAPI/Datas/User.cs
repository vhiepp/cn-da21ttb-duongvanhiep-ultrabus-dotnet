using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

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
        [MaxLength(50)]
        public string? FirstName { get; set; }

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

        public Role Role { get; set; }

        public bool IsSuperAdmin { get; set; } = false;

        public bool IsCustomer { get; set; } = false;

        [AllowNull]
        public int? WardId { get; set; }
        public Ward Ward { get; set; }

        [AllowNull]
        public int? DistrictId { get; set; }
        public District District { get; set; }

        [AllowNull]
        public int? ProvinceId { get; set; }
        public Province Province { get; set; }

        [AllowNull]
        public string? Address { get; set; }

        public User()
        {
            Role = new Role() { Name = "Customer" };
            FirstName = "";
            UserName = "";
            Ward = new Ward();
            District = new District();
            Province = new Province();
        }
    }
}
