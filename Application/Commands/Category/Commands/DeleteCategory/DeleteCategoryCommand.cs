using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Commands.Category.Commands.DeleteCategory
{
    public class DeleteCategoryCommand : IRequest
    {
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
                var category = await _context.Category.FindAsync(request.Id);

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
