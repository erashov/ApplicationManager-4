using System.Linq;
using System.Threading.Tasks;
using ApplicationManager.DAL.Entites;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System;

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
            if (!_ctx.ApplicationStatuses.Any())
            {
                _ctx.ApplicationStatuses.AddRange(new List<ApplicationStatusEntity>()
                {
                    new ApplicationStatusEntity(){ StatusName = "В обработке" },
                    new ApplicationStatusEntity(){ StatusName = "В ожидании" },
                    new ApplicationStatusEntity(){ StatusName = "В работе" },
                    new ApplicationStatusEntity(){ StatusName = "Возврат" },
                    new ApplicationStatusEntity(){ StatusName = "Выполнено" }
                });
                _ctx.SaveChanges();
            }
            if (!_ctx.Districts.Any())
            {
                _ctx.Districts.AddRange(new List<DistrictEntity>() {
                    new DistrictEntity { DistrictName = "Север" },
                    new DistrictEntity { DistrictName = "Юг" },
                    new DistrictEntity { DistrictName = "Восток" },
                    new DistrictEntity { DistrictName = "Запад" }
                });
                _ctx.SaveChanges();
            }
            if (!_ctx.Applications.Any())
            {
                string[] addresses = new string[] { "Варшавское шоссе", "ул. Академика Янгеля","ул. Чертановская","ул. Россошанская", "ул. Ленинское шоссе","ул. Охотный ряд", "ул. Воздвиженка", "ул. Новослободская", "ул. Трифоновская" };
                Random r = new Random();

                for (int i=0; i<50000; i++)
                {
                    var create = GenererateRandomDate();
                    int status = r.Next(1, 5);            
                    
                    _ctx.Applications.Add(new ApplicationEntiry {
                        NumML = r.Next(500001, 599999),
                        Address = $"{addresses[r.Next(0, addresses.Count() - 1)]}, {r.Next(1, 200)}",
                        ApplicationStatusId = status,
                        DistrictId = r.Next(1, 4),
                        CreateDate = create,
                        EndDate = (status > 3) ? (DateTime?)create.AddDays(r.Next(1, 10)) : null
                });
                }
                _ctx.SaveChanges();
            }
        }

        DateTime GenererateRandomDate()
        {
            
            Random rnd = new Random();
            DateTime date =  DateTime.Now;
            int year = rnd.Next(date.Year, DateTime.Now.Year+1);
            int month = rnd.Next(1, 12);
            int day = DateTime.DaysInMonth(year, month);

            int Day = rnd.Next(1, day);

            DateTime dt = new DateTime(year, month, Day);
            return dt;
        }

    }
}