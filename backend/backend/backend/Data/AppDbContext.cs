using Microsoft.EntityFrameworkCore;
using ContractorFinder.Models;

namespace ContractorFinder.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Contractor> Contractors { get; set; }
    }
}