using FlightReservation.Domain.Models;

namespace FlightReservation.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetUserByUsernameAsync(string username);
        Task AddUserAsync(User user);
    }
}
