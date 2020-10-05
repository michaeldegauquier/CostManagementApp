using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Commands.Product.Queries.GetAllProducts
{
    public class GetAllProductsQuery : IRequest<List<Domain.Models.Product>>
    {
        public class GetAllProductsQueryHandler : IRequestHandler<GetAllProductsQuery, List<Domain.Models.Product>>
        {
            private readonly IDatabaseContext _context;

            public GetAllProductsQueryHandler(IDatabaseContext context)
            {
                _context = context;
            }

            public async Task<List<Domain.Models.Product>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
            {
                return await _context.Product
                    .OrderByDescending(x => x.DatePurchased)
                    .ToListAsync(cancellationToken);
            }
        }
    }
}
