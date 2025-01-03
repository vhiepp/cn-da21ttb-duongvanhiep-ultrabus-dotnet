namespace UltraBusAPI.Repositories
{
    public interface IBaseRepository<T> where T : class
    {
        public Task<T?> FindByIdAsync(Guid id);

        public Task<T?> FindByIdAsync(int id);
        public Task<T?> FindByIdAsync(int? id);

        public Task<List<T>> GetAllAsync();

        public Task AddAsync(T entity);

        public Task UpdateAsync(T entity);

        public Task DeleteByIdAsync(Guid id);

        public Task DeleteByIdAsync(int id);
    }
}
