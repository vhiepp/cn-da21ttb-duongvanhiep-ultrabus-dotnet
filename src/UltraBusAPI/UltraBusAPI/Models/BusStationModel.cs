namespace UltraBusAPI.Models
{
    public class BusStationModel
    {
        public int? Id { get; set; } = null;
        public string? Name { get; set; } = null;
        public int? ProvinceId { get; set; } = null;
        public int? DistrictId { get; set; } = null;
        public int? WardId { get; set; } = null;
        public string? Address { get; set; } = null;
        public string? fullAddress => $"{Address}, {Ward?.FullName}, {District?.FullName}, {Province?.FullName}".Trim();
        public double? Latitude { get; set; } = null;
        public double? Longitude { get; set; } = null;
        public ProvinceModel? Province { get; set; } = null;
        public DistrictModel? District { get; set; } = null;
        public WardModel? Ward { get; set; } = null;
    }

    public class CreateBusStationModel
    {
        public required string Name { get; set; }
        public int ProvinceId { get; set; }
        public int DistrictId { get; set; }
        public int WardId { get; set; }
        public string? Address { get; set; } = null;
        public double? Latitude { get; set; } = null;
        public double? Longitude { get; set; } = null;
    }
}
