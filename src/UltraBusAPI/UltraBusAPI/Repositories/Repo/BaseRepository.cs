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
        public async Task Add(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteById(Guid id)
        {
            var entity = await FindById(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteById(int id)
        {
            var entity = await FindById(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<T?> FindById(Guid id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<T?> FindById(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task Update(T entity)
        {
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}
