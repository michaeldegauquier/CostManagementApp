using Application.Common.Interfaces;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Commands.Product.Commands.CreateProduct
{
    public class CreateProductCommand : IRequest<long>
    {
        public DateTime DatePurchased { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public bool Paid { get; set; }
        public long CategoryId { get; set; }

        public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, long>
        {
            private readonly IDatabaseContext _context;

            public CreateProductCommandHandler(IDatabaseContext context)
            {
                _context = context;
            }

            public async Task<long> Handle(CreateProductCommand request, CancellationToken cancellationToken)
            {
                var product = new Domain.Models.Product();
                product.DatePurchased = request.DatePurchased;
                product.Description = request.Description.Trim();
                product.Price = request.Price;
                product.Paid = request.Paid;
                product.CategoryId = request.CategoryId;

                _context.Product.Add(product);
                await _context.SaveChangesAsync(cancellationToken);

                return product.Id;
            }
        }
    }
}
