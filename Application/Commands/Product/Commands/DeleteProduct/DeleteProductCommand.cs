using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Commands.Product.Commands.DeleteProduct
{
    public class DeleteProductCommand : IRequest
    {
        public string UserId { get; set; }
        public long Id { get; set; }

        public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand>
        {
            private readonly IDatabaseContext _context;

            public DeleteProductCommandHandler(IDatabaseContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
            {
                var product = await _context.Product
                    .Where(x => x.UserId == request.UserId)
                    .FirstOrDefaultAsync(i => i.Id == request.Id);

                if (product == null)
                {
                    throw new NotFoundException(nameof(Product), request.Id);
                }

                _context.Product.Remove(product);
                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
