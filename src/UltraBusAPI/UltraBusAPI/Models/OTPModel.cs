namespace UltraBusAPI.Models
{
    public class OTPModel
    {
        public string? PhoneNumber { get; set; }
        public string? Code { get; set; }
        public string? Key { get; set; }
        public DateTime ExpiredAt { get; set; }
    }

    public class OTPVerifyModel
    {
        public string? PhoneNumber { get; set; }
        public string? Code { get; set; }
        public string? Key { get; set; }
    }

    public class OTPSmsModel
    {
        public required int Id { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Content { get; set; }
    }

    public class OTPPhoneNumberModelRequest
    {
        public required string PhoneNumber { get; set; }
    }
}
