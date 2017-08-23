using System.ComponentModel.DataAnnotations;

namespace ApplicationManager.Model.AccountViewModels
{
    public class ExternalLoginViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

    }
}