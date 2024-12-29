namespace UltraBusAPI.Models
{
    public class AuthModel
    {
    }

    public class SignInModel
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
