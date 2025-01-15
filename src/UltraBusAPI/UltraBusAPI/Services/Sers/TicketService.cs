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

        public async Task<List<TicketModel>> GetTicketByUserId(int userId)
        {
            var tickets = await _ticketRepository.GetByUserId(userId);
            var ticketModels = new List<TicketModel>();
            foreach (var ticket in tickets)
            {
                if (ticket.IsPaid == false && ticket.ExpriedTime <= DateTime.Now) continue;
                var busRouteTripDate = await _busRouteTripDateRepository.FindByIdAsync(ticket.BusRouteTripDateId);
                var user = await _userRepository.FindByIdAsync(ticket.UserId);
                var busStationUp = await _busStationRepository.FindByIdAsync(ticket.BusStationUpId);
                var busStationDown = await _busStationRepository.FindByIdAsync(ticket.BusStationDownId);
                ticketModels.Add(new TicketModel
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
                    BusStationUp = new BusStationModel
                    {
                        Id = busStationUp.Id,
                        Name = busStationUp.Name,
                        Address = busStationUp.Address,
                    },
                    BusStationDown = new BusStationModel
                    {
                        Id = busStationDown.Id,
                        Name = busStationDown.Name,
                        Address = busStationDown.Address,
                    },
                    TotalPrice = ticket.TotalPrice,
                    CustomerName = ticket.CustomerName,
                    PhoneNumber = ticket.PhoneNumber,
                    Email = ticket.Email,
                    IsPaid = ticket.IsPaid,
                    CollectUser = new UserModel(),
                    DepartureDay = busRouteTripDate.DepartureDay,
                    DepartureTime = busRouteTripDate.DepartureTime,
                    ArrivalTime = busRouteTripDate.ArrivalTime,
                    CheckoutUrl = ticket.CheckoutUrl,
                });
            }
            return ticketModels;
        }

        public async Task<List<TicketModel>> SearchTickets(SearchTicketModel model)
        {
            var busRouteTrip = await _busRouteTripRepository.FindByBusRouteIdBusIdAndTime((int)model.BusRouteId, (int)model.BusId, (DateTime)model.DepartureTime);
            if (busRouteTrip == null)
            {
                return new List<TicketModel>();
            }
            var busRouteTripDate = await _busRouteTripDateRepository.FindByBusRouteTripDateAsync(busRouteTrip.Id, (DateTime)model.DepartureDay);
            if (busRouteTripDate == null)
            {
                return new List<TicketModel>();
            }
            var tickets = await _ticketRepository.GetByBusRouteTripDateId(busRouteTripDate.Id);
            var ticketModels = new List<TicketModel>();
            foreach (var ticket in tickets) {
                if (ticket.IsPaid == false && ticket.ExpriedTime <= DateTime.Now) continue;
                var user = await _userRepository.FindByIdAsync(ticket.UserId);
                var busStationUp = await _busStationRepository.FindByIdAsync(ticket.BusStationUpId);
                var busStationDown = await _busStationRepository.FindByIdAsync(ticket.BusStationDownId);
                ticketModels.Add(new TicketModel
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
                    BusStationUp = new BusStationModel
                    {
                        Id = busStationUp.Id,
                        Name = busStationUp.Name,
                        Address = busStationUp.Address,
                    },
                    BusStationDown = new BusStationModel
                    {
                        Id = busStationDown.Id,
                        Name = busStationDown.Name,
                        Address = busStationDown.Address,
                    },
                    TotalPrice = ticket.TotalPrice,
                    CustomerName = ticket.CustomerName,
                    PhoneNumber = ticket.PhoneNumber,
                    Email = ticket.Email,
                    IsPaid = ticket.IsPaid,
                    CollectUser = new UserModel(),
                    DepartureDay = busRouteTripDate.DepartureDay,
                    DepartureTime = busRouteTripDate.DepartureTime,
                    ArrivalTime = busRouteTripDate.ArrivalTime,
                });
            }
            return ticketModels;
        }
    }
}
