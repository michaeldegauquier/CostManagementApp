using Application.Common.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Commands.Category.Queries.GetCategoryById
{
    public class GetCategoryByIdQuery : IRequest<Domain.Models.Category>
    {
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
                return await _context.Category.FindAsync(request.Id);
            }
        }
    }
}
