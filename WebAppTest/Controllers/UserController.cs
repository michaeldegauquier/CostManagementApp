using System.Threading.Tasks;
using Application.Commands.User.Commands.CreateUser;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebAppTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // POST: api/User/Register
        [HttpPost("Register")]
        public async Task<IActionResult> Register(CreateUserCommand user)
        {
            return Ok(await _mediator.Send(user));
        }
    }
}
