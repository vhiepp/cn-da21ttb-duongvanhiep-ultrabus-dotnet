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
        public Guid Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [AllowNull]
        public string LastName { get; set; }

        [Required]
        [MaxLength(10)]
        public GenderType Gender { get; set; }

        [AllowNull]
        public string Email { get; set; }

        [AllowNull]
        public string PhoneNumber { get; set; }

        [AllowNull]
        public Guid RoleId { get; set; }
        public Role Role { get; set; }

        public User()
        {
            Role = new Role() { Name = "Customer" };
            FirstName = "";
        }
    }
}
