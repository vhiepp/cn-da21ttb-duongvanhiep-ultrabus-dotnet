using UltraBusAPI.Datas;
using UltraBusAPI.Models;
using UltraBusAPI.Repositories;

namespace UltraBusAPI.Services.Sers
{
    public class UserService : IUserService
    {
        public readonly IUserRepository _userRepository;
        public readonly IRoleRepository _roleRepository;
        public readonly IAuthService _authService;

        public UserService(IUserRepository userRepository, IRoleRepository roleRepository, IAuthService authService)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _authService = authService;
        }

        public async Task Create(CreateUserModel createUserModel)
        {
            await _userRepository.AddAsync(new User
            {
                UserName = createUserModel.UserName,
                Email = createUserModel.Email,
                PhoneNumber = createUserModel.PhoneNumber,
                FirstName = createUserModel.FirstName,
                LastName = createUserModel.LastName,
                WardId = createUserModel.WardId,
                DistrictId = createUserModel.DistrictId,
                ProvinceId = createUserModel.ProvinceId,
                Address = createUserModel.Address,
                Password = _authService.HashPassword(createUserModel.Password),
                Gender = createUserModel.Gender,
                IsCustomer = false,
                IsSuperAdmin = false,
                RoleId = createUserModel.RoleId
            });
        }

        public async Task Delete(int id)
        {
            var user = await _userRepository.FindByIdAsync(id);
            if (user != null)
            {
                await _userRepository.DeleteByIdAsync(id);
            }
        }

        public async Task<UserModel?> FindById(int id)
        {
            var user = await _userRepository.FindByIdAsync(id);
            if (user == null)
            {
                return null;
            }
            var userModel = new UserModel
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                FirstName = user.FirstName,
                LastName = user.LastName,
                WardId = user.WardId,
                DistrictId = user.DistrictId,
                ProvinceId = user.ProvinceId,
                Address = user.Address,
                Gender = user.Gender,
                IsCustomer = user.IsCustomer,
                IsSuperAdmin = user.IsSuperAdmin,
                RoleId = user.RoleId
            };
            if (user.Role != null)
            {
                userModel.Role = new RoleModel
                {
                    Id = user.Role.Id,
                    Name = user.Role.Name,
                    Description = user.Role.Description
                };
            }
            return userModel;
        }

        public async Task<UserModel?> GetAdminById(int id)
        {
            var user = await _userRepository.FindAdminById(id);
            if (user == null)
            {
                return null;
            }
            RoleModel? roleModel = null;
            if (user.RoleId != null)
            {
                var role = await _roleRepository.FindByIdAsync(user.RoleId);
                if (role != null)
                {
                    roleModel = new RoleModel();
                    roleModel.Id = role.Id;
                    roleModel.Name = role.Name;
                    roleModel.Description = role.Description;
                }
            }
            return new UserModel
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                FirstName = user.FirstName,
                LastName = user.LastName,
                WardId = user.WardId,
                DistrictId = user.DistrictId,
                ProvinceId = user.ProvinceId,
                Address = user.Address,
                RoleId = user.RoleId,
                Role = roleModel,
                Gender = user.Gender,
            };
        }

        public async Task<List<UserModel>> GetAllAdmin()
        {
            var user = await _userRepository.GetAllAdmin();
            var users = new List<UserModel>();
            foreach (var userModel in user)
            {
                RoleModel? roleModel = null;
                if (userModel.RoleId != null)
                {
                    var role = await _roleRepository.FindByIdAsync(userModel.RoleId.Value);
                    if (role != null)
                    {
                        roleModel = new RoleModel();
                        roleModel.Id = role.Id;
                        roleModel.Name = role.Name;
                        roleModel.Description = role.Description;
                    }
                }
                users.Add(new UserModel
                {
                    Id = userModel.Id,
                    UserName = userModel.UserName,
                    Email = userModel.Email,
                    PhoneNumber = userModel.PhoneNumber,
                    FirstName = userModel.FirstName,
                    LastName = userModel.LastName,
                    WardId = userModel.WardId,
                    DistrictId = userModel.DistrictId,
                    ProvinceId = userModel.ProvinceId,
                    Address = userModel.Address,
                    RoleId = userModel.RoleId,
                    Role = roleModel,
                    Gender = userModel.Gender,
                    IsCustomer = userModel.IsCustomer,
                    IsSuperAdmin = userModel.IsSuperAdmin
                });
            }
            return users;
        }

        public async Task Update(int id, CreateUserModel updateUserModel)
        {
            var user = await _userRepository.FindAdminById(id);
            if (user != null)
            {
                if (updateUserModel.UserName != null) { user.UserName = updateUserModel.UserName; }
                if (updateUserModel.Email != null) { user.Email = updateUserModel.Email; }
                if (updateUserModel.PhoneNumber != null) { user.PhoneNumber = updateUserModel.PhoneNumber; }
                if (updateUserModel.FirstName != null) { user.FirstName = updateUserModel.FirstName; }
                if (updateUserModel.LastName != null) { user.LastName = updateUserModel.LastName; }
                if (updateUserModel.WardId != null) { user.WardId = updateUserModel.WardId; }
                if (updateUserModel.DistrictId != null) { user.DistrictId = updateUserModel.DistrictId; }
                if (updateUserModel.ProvinceId != null) { user.ProvinceId = updateUserModel.ProvinceId; }
                if (updateUserModel.Address != null) { user.Address = updateUserModel.Address; }
                if (updateUserModel.RoleId != null) { user.RoleId = updateUserModel.RoleId; }
                if (updateUserModel.Password != null)
                {
                    user.Password = _authService.HashPassword(updateUserModel.Password);
                }
                user.Gender = updateUserModel.Gender;
                await _userRepository.UpdateAsync(user);
            }
        }
    }
}
