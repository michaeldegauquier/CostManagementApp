using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain.Models;
using MediatR;
using Application.Commands.Category.Queries.GetAllCategories;
using Application.Commands.Category.Queries.GetCategoryById;
using Application.Commands.Category.Commands.UpdateCategory;
using Application.Commands.Category.Commands.CreateCategory;
using Application.Commands.Category.Commands.DeleteCategory;
using Microsoft.AspNetCore.Authorization;
using System.Linq;

namespace WebAppTest.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CategoryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET: api/Category
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategory()
        {
            return await _mediator.Send(new GetAllCategoriesQuery { UserId = getUserId() });
        }

        // GET: api/Category/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(long id)
        {
            var category = await _mediator.Send(new GetCategoryByIdQuery { UserId = getUserId(), Id = id });

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        // PUT: api/Category/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(long id, UpdateCategoryCommand category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            string UserId = getUserId();
            category.UserId = UserId;

            await _mediator.Send(category);

            return NoContent();
        }

        // POST: api/Category
        [HttpPost]
        public async Task<ActionResult<long>> PostCategory(CreateCategoryCommand category)
        {
            string UserId = getUserId();
            category.UserId = UserId;

            return await _mediator.Send(category);
        }

        // DELETE: api/Category/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(long id)
        {
            await _mediator.Send(new DeleteCategoryCommand { UserId = getUserId(), Id = id });

            return NoContent();
        }

        // It returns the right UserId that can be found in the TOKEN
        private string getUserId()
        {
            return HttpContext?.User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier).Value;
        }
    }
}
