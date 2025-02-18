using FlightReservation.Domain.Models;

namespace FlightReservation.Application.Interfaces
{
    public interface IUserService
    {
        Task<User?> GetUserByUsernameAsync(string username);
        Task RegisterUserAsync(User user);
    }
}
