namespace UltraBusAPI.Datas
{
    public class BusRouteStation
    {
        public int? BusRouteId { get; set; }
        public BusRoute? BusRoute { get; set; } = null;
        public int? BusStationId { get; set; }
        public BusStation? BusStation { get; set; } = null;
    }
}
