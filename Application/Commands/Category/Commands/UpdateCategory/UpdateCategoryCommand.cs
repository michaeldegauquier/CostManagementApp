using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Commands.Category.Commands.UpdateCategory
{
    public class UpdateCategoryCommand : IRequest
    {
        public long Id { get; set; }
        public string Name { get; set; }

        public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand>
        {
            private readonly IDatabaseContext _context;

            public UpdateCategoryCommandHandler(IDatabaseContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
            {
                var categoryList = await _context.Category.ToListAsync();
                var category = await _context.Category.FindAsync(request.Id);
                category.Name = request.Name.Trim();

                if (category == null)
                {
                    throw new NotFoundException(nameof(Category), request.Id);
                }

                if (categoryList.Exists(x => x.Name.ToLower().Trim() == category.Name.ToLower().Trim() && x.Id != request.Id))
                {
                    throw new ArgumentException("Already Exists", nameof(request.Name));
                }

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
