using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Commands.Category.Commands.DeleteCategory
{
    public class DeleteCategoryCommand : IRequest
    {
        public string UserId { get; set; }
        public long Id { get; set; }

        public class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand>
        {
            private readonly IDatabaseContext _context;

            public DeleteCategoryCommandHandler(IDatabaseContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
            {
                var category = await _context.Category
                    .Where(x => x.UserId == request.UserId)
                    .FirstOrDefaultAsync(i => i.Id == request.Id);

                if (category == null)
                {
                    throw new NotFoundException(nameof(Category), request.Id);
                }

                _context.Category.Remove(category);
                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
