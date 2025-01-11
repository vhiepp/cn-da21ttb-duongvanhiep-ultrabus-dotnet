using Microsoft.EntityFrameworkCore;
using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories.Repo
{
    public class OTPRepository : BaseRepository<OTP>, IOTPRepository
    {
        private readonly MyDBContext _context;
        private readonly DbSet<OTP> _dbSet;
        public OTPRepository(MyDBContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<OTP>();
        }

        public async Task<OTP?> FindByPhoneNumberAsync(string phoneNumber, string Key)
        {
            return await _dbSet.FirstOrDefaultAsync(x => x.PhoneNumber == phoneNumber && x.Key == Key);
        }
    }
}
