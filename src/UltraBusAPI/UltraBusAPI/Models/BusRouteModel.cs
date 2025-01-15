namespace UltraBusAPI.Models
{
    public class BusRouteModel
    {
        public int Id { get; set; }

        public double? Price { get; set; }

        public List<BusStationModel>? Stations { get; set; } = null;

        public BusStationModel? StartStation { get; set; } = null;

        public BusStationModel? EndStation { get; set; } = null;
    }

    public class CreateBusRouteModel
    {
        public required double Price { get; set; }

        public required List<int> Stations { get; set; }
    }

    public class UpdateBusRouteTripModel
    {
        public required int BusRouteId { get; set; }
        public required int BusId { get; set; }
        public required int TotalHours { get; set; }
        public required int TotalMinutes { get; set; }
        public required double Price { get; set; }
        public required List<DateTime> DepartureTimes { get; set; } = new List<DateTime>();
    }

    public class BusRouteTripModel
    {
        public int Id { get; set; }
        public int? BusRouteId { get; set; }
        public int? BusId { get; set; }
        public int TotalHours { get; set; }
        public int TotalMinutes { get; set; }
        public int TotalSeatEmptys { get; set; } = 0;
        public List<string> SeatSelectds { get; set; } = [];
        public double? Price { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public BusModel? Bus { get; set; } = null;
        public BusRouteModel? BusRoute { get; set; } = null;
        public BusStationModel? StartStation { get; set; } = null;
        public BusStationModel? EndStation { get; set; } = null;
    }

    public class SearchBusRouteTripsModel
    {
        public required int StartProvinceId { get; set; }
        public required int EndProvinceId { get; set; }
        public DateTime? Date { get; set; } = null;
    }
}
