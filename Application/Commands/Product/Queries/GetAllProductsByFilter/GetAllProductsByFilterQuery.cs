using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Commands.Product.Queries.GetAllProductsByFilter
{
    public class GetAllProductsByFilterQuery : IRequest<List<Domain.Models.Product>>
    {
        public string UserId { get; set; }
        public int? Year { get; set; }
        public int? Month { get; set; }
        public int? Day { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }


        public class GetAllProductsByFilterQueryHandler : IRequestHandler<GetAllProductsByFilterQuery, List<Domain.Models.Product>>
        {
            private readonly IDatabaseContext _context;

            public GetAllProductsByFilterQueryHandler(IDatabaseContext context)
            {
                _context = context;
            }

            public async Task<List<Domain.Models.Product>> Handle(GetAllProductsByFilterQuery request, CancellationToken cancellationToken)
            {
                var productList = _context.Product.Where(x => x.UserId == request.UserId);
                List<Domain.Models.Product> productListHelper = await productList
                    .Include(x => x.Category)
                    .ToListAsync(cancellationToken);

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

                if (request.Description != null)
                {
                    productListHelper = productListHelper.Where(x => x.Description.ToLower().Contains(request.Description.ToLower().Trim())).ToList();
                }

                if (request.Category != null)
                {
                    productListHelper = productListHelper.Where(x => x.Category.Name.ToLower() == request.Category.ToLower().Trim()).ToList();
                }

                return productListHelper.OrderByDescending(x => x.DatePurchased).ToList();
            }
        }
    }
}
