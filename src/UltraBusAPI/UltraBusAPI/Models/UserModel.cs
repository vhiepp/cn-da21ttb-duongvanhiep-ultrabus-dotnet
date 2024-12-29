using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using UltraBusAPI.Datas;

namespace UltraBusAPI.Models
{
    public class UserModel
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;
    }
}
