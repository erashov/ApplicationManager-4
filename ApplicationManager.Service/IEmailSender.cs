using System.Threading.Tasks;

namespace ApplicationManager.Service
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
