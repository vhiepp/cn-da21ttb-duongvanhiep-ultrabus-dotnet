namespace UltraBusAPI.Datas
{
    public class OTP
    {
        public int Id { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Content { get; set; }
        public string? Code { get; set; }
        public bool IsUsed { get; set; } = false;
        public bool Sent { get; set; } = false;
        public string? Key { get; set; }
        public DateTime ExpiredAt { get; set; }
    }
}
