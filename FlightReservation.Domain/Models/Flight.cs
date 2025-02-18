using System.ComponentModel.DataAnnotations;

namespace FlightReservation.Domain.Models
{
    public class Flight
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Airline is required")]
        [MaxLength(100)]
        public string Airline { get; set; } = string.Empty;

        [Required(ErrorMessage = "Origin is required")]
        [MaxLength(50)]
        public string Origin { get; set; } = string.Empty;

        [Required(ErrorMessage = "Destination is required")]
        [MaxLength(50)]
        public string Destination { get; set; } = string.Empty;

        [Required(ErrorMessage = "DepartureTime is required")]
        public DateTime DepartureTime { get; set; }

        [Range(1, 500, ErrorMessage = "AvailableSeats must be between 1 and 500")]
        public int AvailableSeats { get; set; }
    }
}
