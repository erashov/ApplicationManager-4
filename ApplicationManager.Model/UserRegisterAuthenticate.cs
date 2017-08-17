using System.ComponentModel.DataAnnotations;

namespace ApplicationManager.Model
{
    public class UserRegisterAuthenticate
    {
        [Required]
        //[EmailAddress]
        [Display(Name = "UserName")]
        public string UserName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
