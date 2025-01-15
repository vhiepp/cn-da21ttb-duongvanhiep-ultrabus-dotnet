using System.ComponentModel.DataAnnotations;

namespace UltraBusAPI.Datas
{
    public class Ticket
    {
        [Key]
        public int Id { get; set; }

        public int? UserId { get; set; }

        public User? User { get; set; }

        public int? BusRouteTripDateId { get; set; }

        public BusRouteTripDate? BusRouteTripDate { get; set; }

        public int? Quantity { get; set; }

        public List<string>? SeatNumbers { get; set; }

        public int? BusStationUpId { get; set; }

        public BusStation? BusStationUp { get; set; }

        public int? BusStationDownId { get; set; }

        public BusStation? BusStationDown { get; set; }

        public int? ToTalSeats { get; set; } = 0;

        public double? TotalPrice { get; set; }

        public string? CustomerName { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Email { get; set; }

        public bool IsPaid { get; set; } = false;

        public int? ReceivedAmount { get; set; }

        public DateTime ExpriedTime { get; set; }

        public string PaymentMethod { get; set; } = "CK";

        public int? CollectUserId { get; set; }

        public string CheckoutUrl { get; set; } = string.Empty;
    }
}
