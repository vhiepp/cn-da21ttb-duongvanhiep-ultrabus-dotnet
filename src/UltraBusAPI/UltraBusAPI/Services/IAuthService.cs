using UltraBusAPI.Datas;
using UltraBusAPI.Models;

namespace UltraBusAPI.Services
{
    public interface IAuthService
    {
        public string GenerateJwtToken(User user);

        public Task<object> RegisterCustomer(SignUpModel signUp);

        public Task<object> Login(SignInModel signIn);

        public Task<object> Profile(int userId);

        public string HashPassword(string password);

        public bool VerifyPassword(string password, string passwordHash);

        public Task<object> LoginWithPhoneNumber(SignInWithPhoneNumberModel signInWithPhone);
    }
}
