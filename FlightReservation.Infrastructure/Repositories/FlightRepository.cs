using FlightReservation.Domain.Interfaces;
using FlightReservation.Domain.Models;
using FlightReservation.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FlightReservation.Infrastructure.Repositories
{
    public class FlightRepository : IFlightRepository
    {
        private readonly ApplicationDbContext _context;

        public FlightRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Flight>> GetAllFlightsAsync()
        {
            return await _context.Flights.ToListAsync();
        }

        public async Task<Flight?> GetFlightByIdAsync(int id)
        {
            return await _context.Flights.FindAsync(id);
        }

        public async Task AddFlightAsync(Flight flight)
        {
            _context.Flights.Add(flight);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateFlightAsync(Flight flight)
        {
            var existingFlight = await _context.Flights.FindAsync(flight.Id);
            if (existingFlight == null)
            {
                throw new KeyNotFoundException($"Flight with Id {flight.Id} not found.");
            }
            //_context.Flights.Update(flight);
            //existingFlight.Airline = flight.Airline;
            _context.Entry(existingFlight).CurrentValues.SetValues(flight);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteFlightAsync(int id)
        {
            var flight = await _context.Flights.FindAsync(id);
            if (flight != null)
            {
                _context.Flights.Remove(flight);
                await _context.SaveChangesAsync();
            }
        }
    }
}
