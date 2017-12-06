using System.Threading.Tasks;

namespace ApplicationManager.Service
{
    public interface IEmail
    {
        Task SendEmailAsync(string email, string subject, string message);
        Task<int> PaerserEmailAsync(string imapserv, string email, string password, string subject);
    }
}
