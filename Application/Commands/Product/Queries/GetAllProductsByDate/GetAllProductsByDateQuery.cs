using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Commands.Product.Queries.GetAllProductsByDate
{
    public class GetAllProductsByDateQuery : IRequest<List<Domain.Models.Product>>
    {
        public int? Year { get; set; }
        public int? Month { get; set; }
        public int? Day { get; set; }


        public class GetAllProductsByDateQueryHandler : IRequestHandler<GetAllProductsByDateQuery, List<Domain.Models.Product>>
        {
            private readonly IDatabaseContext _context;

            public GetAllProductsByDateQueryHandler(IDatabaseContext context)
            {
                _context = context;
            }

            public async Task<List<Domain.Models.Product>> Handle(GetAllProductsByDateQuery request, CancellationToken cancellationToken)
            {
                var productList = _context.Product;
                List<Domain.Models.Product> productListHelper = await productList.ToListAsync(cancellationToken);

                if (request.Year != null)
                {
                    productListHelper = productListHelper.Where(x => x.DatePurchased.Year == request.Year).ToList();
                }

                if (request.Month != null)
                {
                    productListHelper = productListHelper.Where(x => x.DatePurchased.Month == request.Month).ToList();
                }

                if (request.Day != null)
                {
                    productListHelper = productListHelper.Where(x => x.DatePurchased.Day == request.Day).ToList();
                }

                return productListHelper.OrderByDescending(x => x.DatePurchased).ToList();
            }
        }
    }
}
