using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Commands.Product.Queries.GetProductById
{
    public class GetProductByIdQuery : IRequest<Domain.Models.Product>
    {
        public string UserId { get; set; }
        public long Id { get; set; }

        public class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, Domain.Models.Product>
        {
            private readonly IDatabaseContext _context;

            public GetProductByIdQueryHandler(IDatabaseContext context)
            {
                _context = context;
            }
            
            public async Task<Domain.Models.Product> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
            {
                return await _context.Product
                    .Include(x => x.Category)
                    .Where(x => x.UserId == request.UserId)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);
            }
        }
    }
}
