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

        public DbSet<EquipmentEntity> Equipments { get; set; }

        public DbSet<ChanelEntity> Chanels { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Insure Identity Entities are accounted for.
            base.OnModelCreating(modelBuilder);
        }

    }
}