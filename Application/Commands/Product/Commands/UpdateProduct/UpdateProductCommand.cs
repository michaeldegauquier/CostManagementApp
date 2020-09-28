using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Commands.Product.Commands.UpdateProduct
{
    public class UpdateProductCommand : IRequest
    {
        public long Id { get; set; }
        public DateTime DatePurchased { get; set; }
        public string Description { get; set; }
        public bool Paid { get; set; }

        public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand>
        {
            private readonly IDatabaseContext _context;

            public UpdateProductCommandHandler(IDatabaseContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
            {
                var product = await _context.Product.FindAsync(request.Id);

                if (product == null)
                {
                    throw new NotFoundException(nameof(Product), request.Id);
                }

                product.DatePurchased = request.DatePurchased;
                product.Description = request.Description.Trim();
                product.Paid = request.Paid;

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
