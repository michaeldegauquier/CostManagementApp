using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Commands.User.Commands.CreateUser
{
    public class CreateUserCommand : IRequest<string>
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, string>
        {
            private readonly IDatabaseContext _context;

            public CreateUserCommandHandler(IDatabaseContext context)
            {
                _context = context;
            }

            public async Task<string> Handle(CreateUserCommand request, CancellationToken cancellationToken)
            {
                var user = new Domain.Models.User
                {
                    Id = Guid.NewGuid().ToString(),
                    Email = request.Email.ToLower().Trim(),
                    Password = request.Password
                };

                var userList = await _context.User.ToListAsync();

                if (userList.Exists(x => x.Email.ToLower().Trim() == user.Email.ToLower().Trim()))
                {
                    throw new ArgumentException("Already Exists", nameof(request.Email));
                }

                _context.User.Add(user);
                await _context.SaveChangesAsync(cancellationToken);

                return JsonConvert.SerializeObject(user.Id);
            }
        }
    }
}
