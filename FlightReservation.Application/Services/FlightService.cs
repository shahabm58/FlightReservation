using FlightReservation.Application.Interfaces;
using FlightReservation.Domain.Interfaces;
using FlightReservation.Domain.Models;

namespace FlightReservation.Application.Services
{
    public class FlightService : IFlightService
    {
        private readonly IFlightRepository _flightRepository;

        public FlightService(IFlightRepository flightRepository)
        {
            _flightRepository = flightRepository;
        }

        public async Task<IEnumerable<Flight>> GetFlightsAsync()
        {
            return await _flightRepository.GetAllFlightsAsync();
        }

        public async Task<Flight?> GetFlightByIdAsync(int id)
        {
            return await _flightRepository.GetFlightByIdAsync(id);
        }

        public async Task AddFlightAsync(Flight flight)
        {
            await _flightRepository.AddFlightAsync(flight);
        }

        public async Task UpdateFlightAsync(Flight flight)
        {
            var existingFlight = await _flightRepository.GetFlightByIdAsync(flight.Id);
            if (existingFlight == null)
            {
                throw new KeyNotFoundException($"Flight with Id {flight.Id} not found.");
            }

            await _flightRepository.UpdateFlightAsync(flight);
        }

        public async Task DeleteFlightAsync(int id)
        {
            var existingFlight = await _flightRepository.GetFlightByIdAsync(id);
            if (existingFlight == null)
            {
                throw new KeyNotFoundException($"Flight with Id {id} not found.");
            }

            await _flightRepository.DeleteFlightAsync(id);
        }
    }
}
