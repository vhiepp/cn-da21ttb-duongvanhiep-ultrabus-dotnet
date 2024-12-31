using Microsoft.Extensions.FileProviders;

namespace UltraBusAPI.Configurations
{
    public class FileConfig
    {
        public static void AddPublicFolder(IApplicationBuilder app)
        {
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "Storages/Public")),
                RequestPath = "/public"
            });
        }
    }
}
