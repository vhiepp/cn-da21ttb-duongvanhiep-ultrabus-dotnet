using Microsoft.EntityFrameworkCore;
using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories.Repo
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        private readonly MyDBContext _context;
        private readonly DbSet<T> _dbSet;

        public BaseRepository(MyDBContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public async Task AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteByIdAsync(Guid id)
        {
            var entity = await FindByIdAsync(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteByIdAsync(int id)
        {
            var entity = await FindByIdAsync(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<T?> FindByIdAsync(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<T?> FindByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<T?> FindByIdAsync(int? id)
        {
            if (id == null)
            {
                return null;
            }
            return await _dbSet.FindAsync(id);
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
