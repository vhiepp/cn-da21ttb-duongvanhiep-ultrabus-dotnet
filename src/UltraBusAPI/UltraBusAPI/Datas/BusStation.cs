using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace UltraBusAPI.Datas
{
    public class BusStation
    {
        [Key]
        public int Id { get; set; }

        [AllowNull]
        public string? Name { get; set; } = null;

        [AllowNull]
        public int? WardId { get; set; } = null;

        [AllowNull]
        public int? DistrictId { get; set; } = null;

        [AllowNull]
        public int? ProvinceId { get; set; } = null;

        [AllowNull]
        public double? Latitude { get; set; } = null;

        [AllowNull]
        public double? Longitude { get; set; } = null;

        [AllowNull]
        public string? Address { get; set; } = null;

        [AllowNull]
        public List<BusRoute>? StartBusRoutes { get; set; } = null;

        [AllowNull]
        public List<BusRoute>? EndBusRoutes { get; set; } = null;

        [AllowNull]
        public Ward? Ward { get; set; } = null;

        [AllowNull]
        public District? District { get; set; } = null;

        [AllowNull]
        public Province? Province { get; set; } = null;
    }
}
