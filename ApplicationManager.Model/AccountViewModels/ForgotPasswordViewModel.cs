using System.ComponentModel.DataAnnotations;

namespace ApplicationManager.Model.AccountViewModels
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
    }
}