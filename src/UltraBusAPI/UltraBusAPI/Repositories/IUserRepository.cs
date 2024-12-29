using UltraBusAPI.Models;

namespace UltraBusAPI.Repositories
{
    public interface IUserRepository
    {
        public UserModel GetUserById(Guid id);
    }
}
