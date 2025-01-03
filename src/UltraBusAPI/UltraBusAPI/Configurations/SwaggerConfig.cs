using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;

namespace UltraBusAPI.Configurations
{
    public class SwaggerConfig
    {
        public static void AddSwaggerGen(IServiceCollection services)
        {
            services.AddSwaggerGen(option =>
            {
                option.SwaggerDoc("v1", new OpenApiInfo { Title = "UltraBus API", Version = "v1" });

                option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter a valid token", 
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "Bearer"
                });
                //option.AddSecurityRequirement(new OpenApiSecurityRequirement
                //{
                //    {
                //        new OpenApiSecurityScheme
                //        {
                //            Reference = new OpenApiReference
                //            {
                //                Type=ReferenceType.SecurityScheme,
                //                Id="Bearer"
                //            }
                //        },
                //        new string[]{}
                //    }
                //});
            });
        }
    }
}
