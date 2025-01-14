using System.ComponentModel.DataAnnotations;

namespace UltraBusAPI.Datas
{
    public class BusRouteTrip
    {
        [Key]
        public int Id { get; set; }

        public int? BusRouteId { get; set; }

        public BusRoute? BusRoute { get; set; }

        public int? BusId { get; set; }

        public Bus? Bus { get; set; }

        public int TotalHours { get; set; } = 0;

        public int TotalMinutes { get; set; } = 0;

        public DateTime DepartureTime { get; set; }

        public DateTime ArrivalTime { get; set; }

        public double? Price { get; set; }

        public ICollection<BusRouteTripDate>? BusRouteTripDates { get; set; }
    }
}
