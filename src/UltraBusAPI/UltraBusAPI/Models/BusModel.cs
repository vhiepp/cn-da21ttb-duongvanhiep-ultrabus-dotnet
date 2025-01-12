using UltraBusAPI.Datas;

namespace UltraBusAPI.Models
{
    public class BusModel
    {
        public int Id { get; set; }

        public string? Name { get; set; } = string.Empty;

        public string? Description { get; set; } = string.Empty;

        public BusType BusType { get; set; } = BusType.Seat;

        public string? BrandName { get; set; } = string.Empty;

        public int? Floor { get; set; }

        public int? SeatCount { get; set; }

        public List<List<List<string>>>? SeatArrangement { get; set; } = new List<List<List<string>>>();
    }

    public class  CreateBusModel
    {
        public required string Name { get; set; }

        public required string Description { get; set; }

        public required BusType BusType { get; set; }

        public string BrandName { get; set; } = String.Empty;

        public int Floor { get; set; } = 1;

        public List<List<List<string>>> SeatArrangement { get; set; } = new List<List<List<string>>>();
    }
}
