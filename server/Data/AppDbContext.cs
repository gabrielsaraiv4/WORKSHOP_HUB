using Microsoft.EntityFrameworkCore;
using WorkshopApi.Models;

namespace WorkshopApi.Data {
    public class AppDbContext : DbContext {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Workshop> Workshops { get; set; }
        public DbSet<Colaborador> Colaboradores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Workshop>()
                .HasMany(w => w.Participantes)
                .WithMany(c => c.Workshops)
                .UsingEntity(j => j.ToTable("AtasPresenca"));
        }
    }
}