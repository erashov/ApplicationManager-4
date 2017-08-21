using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ApplicationManager.DAL.Entites;
namespace ApplicationManager.DAL
{
    public class AppDbContext : IdentityDbContext<UserEntity>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<ApplicationEntiry> Applications { get; set; }
        public DbSet<ApplicationStatusEntity> ApplicationStatuses { get; set; }
        public DbSet<DistrictEntity> Districts { get; set; }
        public DbSet<GroupEntity> Groups { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Insure Identity Entities are accounted for.
            base.OnModelCreating(modelBuilder);
        }
        public async void EnsureSeedData(UserManager<UserEntity> userMgr, RoleManager<IdentityRole> roleMgr)
        {
            // Create roles and role claims 
            var user = await userMgr.FindByIdAsync("admin@akado.com");

            // Add user to claim and role
            if (user != null) return;

            // Create roles and role claims 
            var adminRole = await roleMgr.FindByNameAsync("admin");
            if (adminRole == null)
            {
                adminRole = new IdentityRole("admin");
              //  adminRole.Claims.Add(new IdentityRoleClaim<string> { ClaimType = "isAdmin", ClaimValue = "true" });
                await roleMgr.CreateAsync(adminRole);
            }

            user = new UserEntity
            {
                UserName = "admin@akado.com"
            };

            var userResult = await userMgr.CreateAsync(user, "admin");
            var roleResult = await userMgr.AddToRoleAsync(user, "admin");
            var claimResult = await userMgr.AddClaimAsync(user, new Claim("superUser", "true"));

            if (!userResult.Succeeded || !roleResult.Succeeded || !claimResult.Succeeded)
            {
                throw new InvalidOperationException("Failed to build user and roles");
            }
        }
    }
}