using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Application.Commands.Product.Queries.GetAllProducts;
using Application.Commands.Product.Queries.GetProductById;
using Application.Commands.Product.Commands.CreateProduct;
using Application.Commands.Product.Commands.UpdateProduct;
using Application.Commands.Product.Commands.DeleteProduct;
using Application.Commands.Product.Queries.GetAllProductsByFilter;
using Application.Commands.Product.Queries.GetOverviewProductPrices;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using Application.Commands.Product.Commands.DeleteProductByGroupOfIds;

namespace WebAppTest.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<IActionResult> GetProduct()
        {
            return Ok(await _mediator.Send(new GetAllProductsQuery { UserId = getUserId() }));
        }

        // GET: api/Product/Filter?year=2020&month=02&day=12&desc=test&catg=test
        [HttpGet("Filter")]
        public async Task<IActionResult> GetProductByFilter(int? year, int? month, int? day, string desc, string catg)
        {
            return Ok(await _mediator.Send(new GetAllProductsByFilterQuery { UserId = getUserId(), Year = year, Month = month, Day = day, Description = desc, Category = catg }));
        }

        // GET: api/Product/OverviewPricesProducts/Filter?year=2020&catg=test
        [HttpGet("OverviewPricesProducts/Filter")]
        public async Task<IActionResult> GetOverviewPriceProductsByFilter(int? year, string catg)
        {
            return Ok(await _mediator.Send(new GetOverviewProductPricesQuery { UserId = getUserId(), Year = year, Category = catg }));
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(long id)
        {
            var product = await _mediator.Send(new GetProductByIdQuery { UserId = getUserId(), Id = id });

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // PUT: api/Product/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(long id, UpdateProductCommand product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            string UserId = getUserId();
            product.UserId = UserId;

            await _mediator.Send(product);

            return NoContent();
        }

        // PUT: api/Product/PropPaid/5 --> PropPaid = Property Paid Update
        [HttpPut("PropPaid/{id}")]
        public async Task<IActionResult> PutProductPropPaid(long id, UpdateProductPropPaidCommand product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            string UserId = getUserId();
            product.UserId = UserId;

            await _mediator.Send(product);

            return NoContent();
        }

        // POST: api/Product
        [HttpPost]
        public async Task<IActionResult> PostProduct(CreateProductCommand product)
        {
            string UserId = getUserId();
            product.UserId = UserId;

            return Ok(await _mediator.Send(product));
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(long id)
        {
            await _mediator.Send(new DeleteProductCommand { UserId = getUserId(), Id = id });

            return NoContent();
        }

        // DELETE: api/Product/DeleteGroup?ids=12,45,89
        [HttpDelete("DeleteGroup")]
        public async Task<IActionResult> DeleteProductByGroupOfIds(string ids)
        {
            return Ok(await _mediator.Send(new DeleteProductByGroupOfIdsCommand { UserId = getUserId(), Ids = ids }));
        }

        // It returns the right UserId that can be found in the TOKEN
        private string getUserId()
        {
            return HttpContext?.User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier).Value;
        }
    }
}
