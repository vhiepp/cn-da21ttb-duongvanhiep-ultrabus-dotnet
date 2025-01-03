namespace UltraBusAPI.Configurations
{
    public static class CorsConfig
    {
        public static void AddCorsConfig(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });
        }
    }
}
