using UltraBusAPI.Datas;
using UltraBusAPI.Models;
using UltraBusAPI.Repositories;

namespace UltraBusAPI.Services.Sers
{
    public class TicketService : ITicketService
    {
        private readonly ITicketRepository _ticketRepository;
        private readonly IBusRouteTripDateRepository _busRouteTripDateRepository;
        private readonly IBusRouteRepository _busRouteRepository;
        private readonly IBusRouteTripRepository _busRouteTripRepository;
        private readonly IUserRepository _userRepository;
        private readonly IBusStationRepository _busStationRepository;

        public TicketService(
            ITicketRepository ticketRepository,
            IBusRouteTripDateRepository busRouteTripDateRepository,
            IBusRouteRepository busRouteRepository,
            IBusRouteTripRepository busRouteTripRepository,
            IUserRepository userRepository,
            IBusStationRepository busStationRepository)
        {
            _ticketRepository = ticketRepository;
            _busRouteTripDateRepository = busRouteTripDateRepository;
            _busRouteRepository = busRouteRepository;
            _busRouteTripRepository = busRouteTripRepository;
            _userRepository = userRepository;
            _busStationRepository = busStationRepository;
        }

        public async Task<TicketModel> CreateTicketAsync(CreateTicketModel model, int userId)
        {
            var busRouteTripDate = await _busRouteTripDateRepository.FindByBusRouteTripDateAsync(model.BusRouteTripId, model.Date);
            var busRouteTrip = await _busRouteTripRepository.FindByIdAsync(model.BusRouteTripId);
            if (busRouteTripDate == null)
            {
                busRouteTripDate = new BusRouteTripDate
                {
                    BusRouteTripId = model.BusRouteTripId,
                    DepartureDay = model.Date,
                    DepartureTime = busRouteTrip.DepartureTime,
                    ArrivalTime = busRouteTrip.ArrivalTime,
                    SeatArrangement = null,
                    SeatArrangementStatus = null,
                    AvailableSeats = null,
                    Price = busRouteTrip.Price,
                    TotalHours = busRouteTrip.TotalHours,
                    TotalMinutes = busRouteTrip.TotalMinutes,
                };
                await _busRouteTripDateRepository.AddAsync(busRouteTripDate);
            }
            var user = await _userRepository.FindByIdAsync(userId);
            var ticket = new Ticket
            {
                BusRouteTripDateId = busRouteTripDate.Id,
                UserId = user.Id,
                SeatNumbers = model.SeatNumbers,
                Quantity = model.SeatNumbers.Count,
                BusStationUpId = model.BusStationUpId,
                BusStationDownId = model.BusStationDownId,
                ToTalSeats = model.SeatNumbers.Count,
                TotalPrice = model.SeatNumbers.Count * busRouteTrip.Price,
                CustomerName = model.CustomerName,
                PhoneNumber = model.PhoneNumber,
                Email = user.Email,
                IsPaid = false,
                ReceivedAmount = 0,
                CollectUserId = null,
                ExpriedTime = DateTime.Now.AddMinutes(30),
            };
            await _ticketRepository.AddAsync(ticket);
            BusStationModel? busStationUp = null;
            BusStationModel? busStationDown = null;
            //if (model.BusStationUpId != null)
            //{
            //    var busStation = await _busStationRepository.FindByIdAsync(model.BusStationUpId);
            //    busStationUp = new BusStationModel
            //    {
            //        Id = busStation.Id,
            //        Name = busStation.Name,
            //        Address = busStation.Address,
            //    };
            //}
            return new TicketModel
            {
                Id = ticket.Id,
                User = new UserModel
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    Address = user.Address,
                },
                SeatNumbers = ticket.SeatNumbers,
                BusStationUp = busStationUp,
                BusStationDown = busStationDown,
                TotalPrice = ticket.TotalPrice,
                CustomerName = ticket.CustomerName,
                PhoneNumber = ticket.PhoneNumber,
                Email = ticket.Email,
                IsPaid = ticket.IsPaid,
                CollectUser = new UserModel(),
                DepartureDay = busRouteTripDate.DepartureDay,
                DepartureTime = busRouteTripDate.DepartureTime,
                ArrivalTime = busRouteTripDate.ArrivalTime,
            };
        }
    }
}
