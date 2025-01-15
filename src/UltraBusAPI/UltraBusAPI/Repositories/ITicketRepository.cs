﻿using UltraBusAPI.Datas;

namespace UltraBusAPI.Repositories
{
    public interface ITicketRepository : IBaseRepository<Ticket>
    {
        public Task<List<Ticket>> GetByBusRouteTripDateId(int id);
    }
}
