using System.Text.Json;
using UltraBusAPI.Datas;
using UltraBusAPI.Models;
using UltraBusAPI.Repositories;

namespace UltraBusAPI.Services.Sers
{
    public class BusService : IBusService
    {
        public readonly IBusRepository _busRepository;

        public BusService(IBusRepository busRepository)
        {
            _busRepository = busRepository;
        }

        public async Task CreateBus(CreateBusModel busModel)
        {
            string seatArrangementJson = JsonSerializer.Serialize(busModel.SeatArrangement);
            int seatCount = 0;
            foreach (var floor in busModel.SeatArrangement)
            {
                foreach (var col in floor)
                {
                    foreach (var row in col)
                    {
                        if (row != null && row != "")
                        {
                            seatCount++;
                        }
                    }
                }
            }
            var bus = new Bus
            {
                Name = busModel.Name,
                Description = busModel.Description,
                BusType = busModel.BusType,
                BrandName = busModel.BrandName,
                Floor = busModel.Floor,
                SeatArrangement = seatArrangementJson,
                SeatCount = seatCount
            };

            await _busRepository.AddAsync(bus);
        }

        public async Task DeleteById(int id)
        {
            await _busRepository.DeleteByIdAsync(id);
        }

        public async Task<BusModel?> FindById(int id)
        {
            var bus = await _busRepository.FindByIdAsync(id);
            var seatArrangement = new List<List<List<string>>>();
            if (bus == null)
            {
                return null;
            }
            if (bus.SeatArrangement != null)
            {
                seatArrangement = JsonSerializer.Deserialize<List<List<List<string>>>>(bus.SeatArrangement);
            }
            var busModel = new BusModel
            {
                Id = bus.Id,
                Name = bus.Name,
                Description = bus.Description,
                BusType = bus.BusType,
                BrandName = bus.BrandName,
                Floor = bus.Floor,
                SeatCount = bus.SeatCount,
                SeatArrangement = seatArrangement
            };
            return busModel;
        }

        public async Task<List<BusModel>> GetAll()
        {
            var buses = await _busRepository.GetAllAsync();
            var busModels = new List<BusModel>();
            foreach (var bus in buses)
            {
                var seatArrangement = new List<List<List<string>>>();
                if (bus.SeatArrangement != null)
                {
                    seatArrangement = JsonSerializer.Deserialize<List<List<List<string>>>>(bus.SeatArrangement);
                }
                var busModel = new BusModel
                {
                    Id = bus.Id,
                    Name = bus.Name,
                    Description = bus.Description,
                    BusType = bus.BusType,
                    BrandName = bus.BrandName,
                    Floor = bus.Floor,
                    SeatCount = bus.SeatCount,
                    SeatArrangement = seatArrangement
                };
                busModels.Add(busModel);
            }
            return busModels;
        }

        public async Task UpdateBus(int id, CreateBusModel busModel)
        {
            string seatArrangementJson = JsonSerializer.Serialize(busModel.SeatArrangement);
            int seatCount = 0;
            foreach (var floor in busModel.SeatArrangement)
            {
                foreach (var col in floor)
                {
                    foreach (var row in col)
                    {
                        if (row != null && row != "")
                        {
                            seatCount++;
                        }
                    }
                }
            }
            var bus = new Bus
            {
                Id = id,
                Name = busModel.Name,
                Description = busModel.Description,
                BusType = busModel.BusType,
                BrandName = busModel.BrandName,
                Floor = busModel.Floor,
                SeatArrangement = seatArrangementJson,
                SeatCount = seatCount
            };

            await _busRepository.UpdateAsync(bus);
        }
    }
}
