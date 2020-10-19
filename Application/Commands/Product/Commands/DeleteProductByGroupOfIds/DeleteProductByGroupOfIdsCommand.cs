using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Commands.Product.Commands.DeleteProductByGroupOfIds
{
    public class DeleteProductByGroupOfIdsCommand : IRequest<List<long>>
    {
        public string UserId { get; set; }
        public string Ids { get; set; }

        public class DeleteProductByGroupOfIdsCommandHandler : IRequestHandler<DeleteProductByGroupOfIdsCommand, List<long>>
        {
            private readonly IDatabaseContext _context;

            public DeleteProductByGroupOfIdsCommandHandler(IDatabaseContext context)
            {
                _context = context;
            }

            public async Task<List<long>> Handle(DeleteProductByGroupOfIdsCommand request, CancellationToken cancellationToken)
            {
                //Convert string 1,2,5 to list of type long
                if (request.Ids != null)
                {
                    var ids = request.Ids.Split(',').Select(long.Parse).ToList();

                    var products = await _context.Product
                    .Where(x => x.UserId == request.UserId && ids.Contains(x.Id))
                    .ToListAsync();

                    if (products == null)
                    {
                        throw new NotFoundException(nameof(Product), request.UserId);
                    }

                    if (ids != null || ids.Count > 0)
                    {
                        _context.Product.RemoveRange(products);
                        await _context.SaveChangesAsync(cancellationToken);
                        return ids;
                    }

                    return ids;
                }

                return null;
            }
        }
    }
}
