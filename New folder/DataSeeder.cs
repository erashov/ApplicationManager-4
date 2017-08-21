using System.Linq;
using System.Threading.Tasks;
using ApplicationManager.DAL.Entites;
using Microsoft.AspNetCore.Identity;

namespace ApplicationManager.DAL
{
    public class DataSeeder
    {
        private readonly AppDbContext _ctx;
        private readonly UserManager<UserEntity> _userManager;

        public DataSeeder(AppDbContext ctx, UserManager<UserEntity> userManager)
        {
            _ctx = ctx;
            _userManager = userManager;
        }

        public async Task SeedAsync()
        {
            _ctx.Database.EnsureCreated();

            if (!_ctx.Users.Any())
            {

                var user = new UserEntity()
                {
                    Email = "admin@acado.com",
                    UserName = "admin"
                };

                var result = await _userManager.CreateAsync(user, "P@ssw0rd!");
                if (result.Succeeded)
                {
                    user.EmailConfirmed = true;
                    await _userManager.UpdateAsync(user);
                }
            }
        }

    }
}