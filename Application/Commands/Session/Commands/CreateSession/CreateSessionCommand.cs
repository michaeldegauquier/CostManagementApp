using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Commands.Session.Commands.CreateSession
{
    public class CreateSessionCommand : IRequest<Domain.Models.Session>
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public class CreateSessionCommandHandler : IRequestHandler<CreateSessionCommand, Domain.Models.Session>
        {
            private readonly IDatabaseContext _context;
            private IConfiguration _config;

            public CreateSessionCommandHandler(IDatabaseContext context, IConfiguration config)
            {
                _context = context;
                _config = config;
            }

            public async Task<Domain.Models.Session> Handle(CreateSessionCommand request, CancellationToken cancellationToken)
            {
                Domain.Models.Session session = null;
                var user = await _context.User.FirstOrDefaultAsync(x => x.Email == request.Email && x.Password == request.Password);

                if (user != null)
                {
                    var authClaims = new[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.Id),
                        new Claim(ClaimTypes.Name, user.Email)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Appsettings:Token").Value));
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(authClaims),
                        Expires = DateTime.Now.AddDays(1),
                        SigningCredentials = creds
                    };

                    var tokenhandler = new JwtSecurityTokenHandler();
                    var token = tokenhandler.CreateToken(tokenDescriptor);

                    session = new Domain.Models.Session
                    {
                        Token = tokenhandler.WriteToken(token),
                        Expiration = token.ValidTo
                    };
                }

                return session;
            }
        }
    }
}
