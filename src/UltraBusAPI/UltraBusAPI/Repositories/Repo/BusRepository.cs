using Microsoft.EntityFrameworkCore;
using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories.Repo
{
    public class BusRepository : BaseRepository<Bus>, IBusRepository
    {
        private readonly MyDBContext _context;
        private readonly DbSet<Bus> _dbSet;

        public BusRepository(MyDBContext context) : base(context)
        {
            _context = context;
            _dbSet = context.Set<Bus>();
        }
    }
}
