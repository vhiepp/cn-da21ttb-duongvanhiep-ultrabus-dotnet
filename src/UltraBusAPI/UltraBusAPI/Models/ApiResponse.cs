namespace UltraBusAPI.Models
{
    public class ApiResponse
    {
        public bool Success { get; set; } = false;
        public string Message { get; set; } = "Something went wrong";
        public object? Data { get; set; } = null;
        public object? Errors { get; set; } = null;
    }
}
