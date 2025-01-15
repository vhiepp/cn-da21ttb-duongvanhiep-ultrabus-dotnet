using UltraBusAPI.Datas;

namespace UltraBusAPI.Models
{
    public class AuthModel
    {
    }

    public class SignUpModel
    {
        public SignUpModel()
        {
            Gender = GenderType.Other;
        }
        public string? Email { get; set; } = string.Empty;
        public required string Password { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string? LastName { get; set; } = string.Empty;
        public GenderType Gender { get; set; }
        public required string PhoneNumber { get; set; }
        public int? WardId { get; set; } = null;
        public int? DistrictId { get; set; } = null;
        public int? ProvinceId { get; set; } = null;
        public string? Address { get; set; } = string.Empty;

        public Dictionary<string, string> Validate()
        {
            var result = new Dictionary<string, string>();
            bool isValidEmail = Email == null || Email.Contains("@");
            if (!isValidEmail)
            {
                result["Email"] = "Invalid email format";
            }
            // PhoneNumber khong co chu cai
            bool isValidPhoneNumber = PhoneNumber != null && PhoneNumber.All(char.IsDigit) && PhoneNumber.Length <= 11;
            if (!isValidPhoneNumber)
            {
                result["PhoneNumber"] = "Invalid phone number";
            }
            return result;
        }
    }

    public class SignInModel
    {
        public required string UserName { get; set; }
        public required string Password { get; set; }
    }

    public class SignInWithPhoneNumberModel
    {
        public string? FirstName { get; set; } = string.Empty;
        public required string PhoneNumber { get; set; }
        public required string Code { get; set; }
        public required string Key { get; set; }
    }

    public class ProfileModel
    {
        public string? Email { get; set; } = string.Empty;

        public string? FirstName { get; set; } = string.Empty;

        public string? LastName { get; set; } = string.Empty;

        public string FullName => $"{LastName} {FirstName}";

        public GenderType Gender { get; set; } = GenderType.Other;

        public string? PhoneNumber { get; set; } = string.Empty;

        public int? WardId { get; set; } = null;

        public int? DistrictId { get; set; } = null;

        public int? ProvinceId { get; set; } = null;

        public string? Address { get; set; } = string.Empty;

        public bool IsSuperAdmin { get; set; } = false;

        public bool IsCustomer { get; set; } = false;

        public int? RoleId { get; set; } = null;

        public RoleModel? Role { get; set; } = null;
    }
}
