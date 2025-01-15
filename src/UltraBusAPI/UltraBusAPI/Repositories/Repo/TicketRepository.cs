using Microsoft.EntityFrameworkCore;
using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories.Repo
{
    public class TicketRepository : BaseRepository<Ticket>, ITicketRepository
    {
        private readonly MyDBContext _context;
        private readonly DbSet<Ticket> _dbSet;
        public TicketRepository(MyDBContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<Ticket>();
        }

        public async Task<List<Ticket>> GetByBusRouteTripDateId(int id)
        {
            return await _dbSet.Where(x => x.BusRouteTripDateId == id).ToListAsync();
        }

        public async Task<List<Ticket>> GetByUserId(int userId)
        {
            return await _dbSet.Where(x => x.UserId == userId).ToListAsync();
        }
    }
}
