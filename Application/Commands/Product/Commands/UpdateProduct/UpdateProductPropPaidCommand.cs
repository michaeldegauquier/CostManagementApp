using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Commands.Product.Commands.UpdateProduct
{
    public class UpdateProductPropPaidCommand : IRequest
    {
        public long Id { get; set; }
        public bool Paid { get; set; }

        public class UpdateProductPropPaidCommandHandler : IRequestHandler<UpdateProductPropPaidCommand>
        {
            private readonly IDatabaseContext _context;

            public UpdateProductPropPaidCommandHandler(IDatabaseContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(UpdateProductPropPaidCommand request, CancellationToken cancellationToken)
            {
                var product = await _context.Product.FindAsync(request.Id);

                if (product == null)
                {
                    throw new NotFoundException(nameof(Product), request.Id);
                }

                product.Paid = request.Paid;

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
