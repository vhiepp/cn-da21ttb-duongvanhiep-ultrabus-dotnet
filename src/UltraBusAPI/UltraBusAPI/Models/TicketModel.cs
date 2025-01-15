namespace UltraBusAPI.Models
{
    public class TicketModel
    {
        public int Id { get; set; }
        public UserModel User { get; set; } = new UserModel();

        public List<string> SeatNumbers { get; set; } = new List<string>();

        public BusStationModel BusStationUp { get; set; } = new BusStationModel();

        public BusStationModel BusStationDown { get; set; } = new BusStationModel();

        public int Quantity => SeatNumbers.Count;

        public int ToTalSeats => SeatNumbers.Count;

        public double? TotalPrice { get; set; } = 0;

        public string CustomerName { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;

        public string? Email { get; set; } = string.Empty;

        public bool IsPaid { get; set; } = false;

        public UserModel CollectUser { get; set; } = new UserModel();

        public DateTime DepartureDay { get; set; } = DateTime.Now;

        public DateTime DepartureTime { get; set; } = DateTime.Now;

        public DateTime ArrivalTime { get; set; } = DateTime.Now;

        public string CheckoutUrl { get; set; } = string.Empty;
    }

    public class CreateTicketModel
    {
        public int BusRouteTripId { get; set; }

        public DateTime Date { get; set; }

        public string CustomerName { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;

        public List<string> SeatNumbers { get; set; } = new List<string>();

        public int? BusStationUpId { get; set; }

        public int? BusStationDownId { get; set; }
    }

    public class PaymentTicketRequestModel
    {
        public int TicketId { get; set; }

        public string CancelUrl { get; set; } = string.Empty;

        public string ReturnUrl { get; set; } = string.Empty;
    }

    public class  SearchTicketModel
    {
        public DateTime? DepartureDay { get; set; }
        public int? BusRouteId { get; set; }
        public int? BusId { get; set; }
        public DateTime? DepartureTime { get; set; }
    }
}
