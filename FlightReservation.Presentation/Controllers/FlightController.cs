using FlightReservation.Application.Interfaces;
using FlightReservation.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;

namespace FlightReservation.Presentation.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class FlightController : ControllerBase
    {
        private readonly IFlightService _flightService;

        public FlightController(IFlightService flightService)
        {
            _flightService = flightService;
        }

        [HttpGet]
        public async Task<IActionResult> GetFlights()
        {
            var flights = await _flightService.GetFlightsAsync();
            return Ok(flights);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFlight(int id)
        {
            var flight = await _flightService.GetFlightByIdAsync(id);
            if (flight == null)
                return NotFound();

            return Ok(flight);
        }

        [HttpPost]
        public async Task<IActionResult> AddFlight([FromBody] Flight flight)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _flightService.AddFlightAsync(flight);
            return CreatedAtAction(nameof(GetFlight), new { StatusCode = 200, id = flight.Id }, flight);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFlight(int id, [FromBody] Flight flight)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            flight.Id = id;
            await _flightService.UpdateFlightAsync(flight);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlight(int id)
        {
            await _flightService.DeleteFlightAsync(id);
            return NoContent();
        }
    }
}
