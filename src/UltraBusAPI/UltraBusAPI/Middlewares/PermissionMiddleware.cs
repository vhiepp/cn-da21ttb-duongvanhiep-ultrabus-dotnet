using UltraBusAPI.Attributes;
using UltraBusAPI.Models;

namespace UltraBusAPI.Middlewares
{
    public class PermissionMiddleware
    {
        private readonly RequestDelegate _next;

        public PermissionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var endpoint = context.GetEndpoint();
            if (endpoint != null)
            {
                var permissionAttribute = endpoint.Metadata.GetMetadata<PermissionAttribute>();
                if (permissionAttribute != null)
                {
                    var userPermissions = context.User.Claims
                        .Where(c => c.Type == "Permission")
                        .Select(c => c.Value);

                    if (
                        !userPermissions.Contains(permissionAttribute.Permission) &&
                        !userPermissions.Contains(RoleDefaultTypes.SuperAdmin.KeyName)
                    )
                    {
                        context.Response.StatusCode = StatusCodes.Status403Forbidden;
                        await context.Response.WriteAsync("Forbidden: You don't have permission to access this resource.");
                        return;
                    }
                }
            }

            await _next(context);
        }
    }   
}
