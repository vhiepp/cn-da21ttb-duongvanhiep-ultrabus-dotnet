using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace UltraBusAPI.Configurations
{
    public class JwtConfig
    {
        public static void AddJwtConfig(IServiceCollection services, IConfiguration configuration)
        {
            var secretKey = configuration["JWT:Secret"] + "";

            services.AddAuthentication(ops =>
            {
                ops.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                ops.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                ops.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(ops =>
            {
                ops.SaveToken = true;
                ops.RequireHttpsMetadata = false;
                ops.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = true,
                    ValidAudience = configuration["JWT:Audience"],
                    //ValidIssuer = "",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
                };
            });
        }
    }
}
