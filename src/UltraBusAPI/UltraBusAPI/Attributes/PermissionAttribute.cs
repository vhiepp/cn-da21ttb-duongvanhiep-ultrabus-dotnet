namespace UltraBusAPI.Attributes
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public class PermissionAttribute : Attribute
    {
        public string? Permission { get; } = null;

        public PermissionAttribute(string? permission)
        {
            Permission = permission;
        }
    }
}
