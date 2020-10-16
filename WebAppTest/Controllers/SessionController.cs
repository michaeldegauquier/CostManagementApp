using System.Threading.Tasks;
using Application.Commands.Session.Commands.CreateSession;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebAppTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SessionController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // POST: api/Session
        [HttpPost]
        public async Task<IActionResult> Login(CreateSessionCommand command)
        {
            var session = await _mediator.Send(command);

            if (session != null)
            {
                return Ok(new
                {
                    token = session.Token,
                    expiration = session.Expiration
                });
            }
            return Unauthorized("Username or password is incorrect!");
        }
    }
}
