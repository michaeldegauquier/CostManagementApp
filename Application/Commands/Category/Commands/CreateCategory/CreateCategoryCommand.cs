using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Commands.Category.Commands.CreateCategory
{
    public class CreateCategoryCommand : IRequest<long>
    {
        public string UserId { get; set; }
        public string Name { get; set; }

        public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, long>
        {
            private readonly IDatabaseContext _context;

            public CreateCategoryCommandHandler(IDatabaseContext context)
            {
                _context = context;
            }

            public async Task<long> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
            {
                var category = new Domain.Models.Category
                {
                    UserId = request.UserId,
                    Name = request.Name.Trim()
                };

                var categoryList = await _context.Category
                    .Where(x => x.UserId == request.UserId)
                    .ToListAsync();

                if (categoryList.Exists(x => x.Name.ToLower().Trim() == category.Name.ToLower().Trim()))
                {
                    throw new ArgumentException("Already Exists", nameof(request.Name));
                }

                _context.Category.Add(category);
                await _context.SaveChangesAsync(cancellationToken);

                return category.Id;
            }
        }
    }
}
