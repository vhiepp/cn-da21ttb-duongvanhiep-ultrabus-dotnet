namespace UltraBusAPI.Repositories
{
    public interface IBaseRepository<T> where T : class
    {
        public Task<T?> FindById(Guid id);
        public Task<T?> FindById(int id);
        public Task Add(T entity);
        public Task Update(T entity);
        public Task DeleteById(Guid id);
        public Task DeleteById(int id);
    }
}
