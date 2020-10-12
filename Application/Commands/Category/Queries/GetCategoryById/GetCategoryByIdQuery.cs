using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Commands.Category.Queries.GetCategoryById
{
    public class GetCategoryByIdQuery : IRequest<Domain.Models.Category>
    {
        public string UserId { get; set; }
        public long Id { get; set; }

        public class GetCategoryByIdQueryHandler : IRequestHandler<GetCategoryByIdQuery, Domain.Models.Category>
        {
            private readonly IDatabaseContext _context;

            public GetCategoryByIdQueryHandler(IDatabaseContext context)
            {
                _context = context;
            }

            public async Task<Domain.Models.Category> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
            {
                return await _context.Category
                    .Where(x => x.UserId == request.UserId)
                    .FirstOrDefaultAsync(i => i.Id == request.Id);
            }
        }
    }
}
