using Application.Common.Interfaces;
using Domain.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Commands.Product.Queries.GetOverviewProductPrices
{
    public class GetOverviewProductPricesQuery : IRequest<List<Domain.Models.OverviewPricesProduct>>
    {
        public int? Year { get; set; }
        public string Category { get; set; }

        public class GetOverviewProductPricesQueryHandler : IRequestHandler<GetOverviewProductPricesQuery, List<Domain.Models.OverviewPricesProduct>>
        {
            private readonly IDatabaseContext _context;

            public GetOverviewProductPricesQueryHandler(IDatabaseContext context)
            {
                _context = context;
            }

            public async Task<List<OverviewPricesProduct>> Handle(GetOverviewProductPricesQuery request, CancellationToken cancellationToken)
            {
                var productList = _context.Product;
                List<Domain.Models.Product> productListHelper = await productList
                    .Include(x => x.Category)
                    .ToListAsync(cancellationToken);

                List<OverviewPricesProduct> overviewPricesList = new List<OverviewPricesProduct>();

                if (request.Year != null)
                {
                    productListHelper = productListHelper.Where(x => x.DatePurchased.Year == request.Year).ToList();
                }

                if (request.Category != null)
                {
                    productListHelper = productListHelper.Where(x => x.Category.Name.ToLower() == request.Category.ToLower().Trim()).ToList();
                }

                for (int month = 1; month < 13; month++)
                {
                    overviewPricesList.Add(new OverviewPricesProduct
                    {
                        Month = month,
                        Price = Math.Round(productListHelper.Where(x => x.DatePurchased.Month == month).Sum(x => x.Price), 2),
                        PricePaid = Math.Round(productListHelper.Where(x => x.DatePurchased.Month == month && x.Paid == true).Sum(x => x.Price), 2),
                        PriceToPaid = Math.Round(productListHelper.Where(x => x.DatePurchased.Month == month && x.Paid == false).Sum(x => x.Price), 2)
                    });
                }

                return overviewPricesList;
            }
        }
    }
}
