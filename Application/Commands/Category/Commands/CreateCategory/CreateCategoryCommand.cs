using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Commands.Category.Commands.CreateCategory
{
    public class CreateCategoryCommand : IRequest<long>
    {
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
                var category = new Domain.Models.Category();
                category.Name = request.Name.Trim();

                var categoryList = await _context.Category.ToListAsync();

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
