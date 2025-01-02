namespace UltraBusAPI.Models
{
    public class ProvinceModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? NameEnglish { get; set; }
        public string? FullName { get; set; }
        public string? FullNameEnglish { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }

    public class DistrictModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? NameEnglish { get; set; }
        public string? FullName { get; set; }
        public string? FullNameEnglish { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }

    public class WardModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? NameEnglish { get; set; }
        public string? FullName { get; set; }
        public string? FullNameEnglish { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }
}
