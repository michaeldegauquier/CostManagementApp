using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
    public interface IDatabaseContext
    {
        public DbSet<Product> Product { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
