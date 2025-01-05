using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace UltraBusAPI.Datas
{
    public enum BusType
    {
        Seat = 1,
        Bed = 2
    }
    public class Bus
    {
        [Key]
        public int Id { get; set; }

        [AllowNull]
        public string? Name { get; set; } = null;

        [AllowNull]
        public string? Description { get; set; } = null;

        public BusType BusType { get; set; } = BusType.Seat;

        [AllowNull]
        public int? Floor { get; set; } = 1;

        [AllowNull]
        public string? SeatArrangement { get; set; } = null;

        [AllowNull]
        public int? SeatCount { get; set; } = 0;

        [AllowNull]
        public string? BrandName { get; set; } = null;
    }
}
