using System.ComponentModel.DataAnnotations;

namespace FlightReservation.Presentation.DTOs
{
    public class Register
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
        public required string? Role { get; set; }
    }
}