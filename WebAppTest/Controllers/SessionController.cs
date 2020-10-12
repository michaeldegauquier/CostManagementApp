using System;
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
            try
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
                //return Unauthorized();
                return StatusCode(401, "Username or password is incorrect!");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
