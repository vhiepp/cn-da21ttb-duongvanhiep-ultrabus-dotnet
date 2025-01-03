using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using UltraBusAPI.Datas;

namespace UltraBusAPI.Models
{
    public class UserModel
    {
        public int Id { get; set; }

        public string? FirstName { get; set; } = string.Empty;

        public string? LastName { get; set; } = string.Empty;

        public string FullName => $"{LastName} {FirstName}".Trim();

        public string? Email { get; set; } = string.Empty;

        public string? PhoneNumber { get; set; } = string.Empty;

        public string? UserName { get; set; } = string.Empty;

        public GenderType Gender { get; set; } = GenderType.Other;

        public int? WardId { get; set; } = null;

        public int? DistrictId { get; set; } = null;

        public int? ProvinceId { get; set; } = null;

        public string? Address { get; set; } = string.Empty;

        public bool IsCustomer { get; set; } = false;

        public bool IsSuperAdmin { get; set; } = false;

        public int? RoleId { get; set; } = null;

        public RoleModel? Role { get; set; } = null;
    }

    public class CreateUserModel
    {
        public string? FirstName { get; set; } = string.Empty;

        public string? LastName { get; set; } = string.Empty;

        public string? Email { get; set; } = string.Empty;

        public string? PhoneNumber { get; set; } = string.Empty;

        public string? Password { get; set; } = null;

        public required string UserName { get; set; } = string.Empty;

        public GenderType Gender { get; set; } = GenderType.Other;

        public int? WardId { get; set; } = null;

        public int? DistrictId { get; set; } = null;

        public int? ProvinceId { get; set; } = null;

        public string? Address { get; set; } = string.Empty;

        public int? RoleId { get; set; } = null;
    }
}
