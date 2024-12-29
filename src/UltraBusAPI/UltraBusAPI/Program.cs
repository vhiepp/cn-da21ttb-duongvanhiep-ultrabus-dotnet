
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using UltraBusAPI.Configurations;
using UltraBusAPI.Datas;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace UltraBusAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<MyDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
            // Add services to the container.
            builder.Services.AddControllers();
            // Add Repository
            RepositoryConfig.AddRepositorys(builder.Services);
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            // Add Swagger
            SwaggerConfig.AddSwaggerGen(builder.Services);
            // Add Jwt Config
            JwtConfig.AddJwtConfig(builder.Services, builder.Configuration);

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
