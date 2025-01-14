using System.ComponentModel.DataAnnotations;

namespace UltraBusAPI.Datas
{
    public class BusRouteTripDate
    {
        [Key]
        public int Id { get; set; }
        public int? BusRouteTripId { get; set; }
        public BusRouteTrip? BusRouteTrip { get; set; }
        public DateTime DepartureDay { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public int TotalHours { get; set; } = 0;
        public int TotalMinutes { get; set; } = 0;
        public string? SeatArrangement { get; set; }
        public string? SeatArrangementStatus { get; set; }
        public int? AvailableSeats { get; set; }
        public int? StartStationId { get; set; }
        public int? EndStationId { get; set; }
        public BusStation? StartStation { get; set; }
        public BusStation? EndStation { get; set; }
        public List<int>? Stations { get; set; }
        public double? Price { get; set; }
        public ICollection<Ticket>? Tickets { get; set; }
    }
}
