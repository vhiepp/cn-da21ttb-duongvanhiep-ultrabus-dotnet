using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories
{
    public interface IOTPRepository : IBaseRepository<OTP>
    {
        public Task<OTP?> FindByPhoneNumberAsync(string phoneNumber, string Key);
    }
}
