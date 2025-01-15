using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace UltraBusAPI.Datas
{
    public class BusRoute
    {
        [Key]
        public int Id { get; set; }

        [AllowNull]
        public int? StartStationId { get; set; } = null;

        [AllowNull]
        public int? EndStationId { get; set; } = null;

        public int? ProvinceStartStationId { get; set; } = null;

        public int? ProvinceEndStationId { get; set; } = null;

        [AllowNull]
        public List<int>? Stations { get; set; } = [];

        [AllowNull]
        public double? Price { get; set; } = null;

        public BusStation? StartStation { get; set; } = null;

        public BusStation? EndStation { get; set; } = null;

        public ICollection<BusRouteTrip>? BusRouteTrips { get; set; } = null;

        public ICollection<BusRouteStation>? BusRouteStations { get; set; } = null;
    }
}
