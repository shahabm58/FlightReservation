using FlightReservation.Domain.Models;

namespace FlightReservation.Application.Interfaces
{
    public interface IFlightService
    {
        Task<IEnumerable<Flight>> GetFlightsAsync();
        Task<Flight?> GetFlightByIdAsync(int id);
        Task AddFlightAsync(Flight flight);
        Task UpdateFlightAsync(Flight flight);
        Task DeleteFlightAsync(int id);
    }
}
