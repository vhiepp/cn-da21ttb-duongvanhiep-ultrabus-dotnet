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

        public Ward? Ward { get; set; } = null;

        public District? District { get; set; } = null;

        public Province? Province { get; set; } = null;

        public ICollection<BusRoute>? StartBusRoutes { get; set; } = null;

        public ICollection<BusRoute>? EndBusRoutes { get; set; } = null;

        public ICollection<BusRouteStation>? BusRouteStations { get; set; } = null;

        public ICollection<BusRouteTripDate>? StartBusRouteTripDates { get; set; } = null;

        public ICollection<BusRouteTripDate>? EndBusRouteTripDates { get; set; } = null;

        public ICollection<Ticket>? TicketsUp { get; set; } = null;

        public ICollection<Ticket>? TicketsDown { get; set; } = null;
    }
}
