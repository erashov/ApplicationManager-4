using Microsoft.AspNetCore.Identity;
namespace ApplicationManager.DAL.Entites
{
    public class UserEntity : IdentityUser
    {
        public int? GroupId { get; set; }
        public GroupEntity Group { get; set; }
    }
}