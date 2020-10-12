using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Commands.Category.Queries.GetAllCategories
{
    public class GetAllCategoriesQuery : IRequest<List<Domain.Models.Category>>
    {
        public string UserId { get; set; }

        public class GetAllCategoriesQueryHandler : IRequestHandler<GetAllCategoriesQuery, List<Domain.Models.Category>>
        {
            private readonly IDatabaseContext _context;

            public GetAllCategoriesQueryHandler(IDatabaseContext context)
            {
                _context = context;
            }

            public async Task<List<Domain.Models.Category>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
            {
                return await _context.Category
                    .Where(x => x.UserId == request.UserId)
                    .OrderBy(x => x.Name)
                    .ToListAsync(cancellationToken);
            }
        }
    }
}
