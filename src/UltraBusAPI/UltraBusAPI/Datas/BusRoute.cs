using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace UltraBusAPI.Datas
{
    public class BusRoute
    {
        [Key]
        public int Id { get; set; }

        [AllowNull]
        public int? BusId { get; set; } = null;

        [AllowNull]
        public int? StartStationId { get; set; } = null;

        [AllowNull]
        public int? EndStationId { get; set; } = null;

        [AllowNull]
        public List<int>? Stations { get; set; } = [];

        [AllowNull]
        public string? StartTime { get; set; } = null;

        [AllowNull]
        public string? EndTime { get; set; } = null;

        [AllowNull]
        public double? Price { get; set; } = null;

        [AllowNull]
        public Bus? Bus { get; set; } = null;

        [AllowNull]
        public BusStation? StartStation { get; set; } = null;

        [AllowNull]
        public BusStation? EndStation { get; set; } = null;
    }
}
