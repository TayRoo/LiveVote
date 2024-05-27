using Microsoft.EntityFrameworkCore;
using VoteLive.Models;

namespace VoteLive.Repository
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }

        // Define your DbSets here. For example:
        public DbSet<Vote> Votes { get; set; }
        public DbSet<User> Users => Set<User>();
    }
}
