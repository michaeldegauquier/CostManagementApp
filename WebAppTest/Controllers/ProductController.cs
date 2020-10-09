using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain.Models;
using MediatR;
using Application.Commands.Product.Queries.GetAllProducts;
using Application.Commands.Product.Queries.GetProductById;
using Application.Commands.Product.Commands.CreateProduct;
using Application.Commands.Product.Commands.UpdateProduct;
using Application.Commands.Product.Commands.DeleteProduct;
using Application.Commands.Product.Queries.GetAllProductsByFilter;
using Application.Commands.Product.Queries.GetOverviewProductPrices;

namespace WebAppTest.Controllers
{
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
        public async Task<ActionResult<IEnumerable<Product>>> GetProduct()
        {
            return await _mediator.Send(new GetAllProductsQuery());
        }

        // GET: api/Product/Filter?year=2020&month=02&day=12&desc=test&catg=test
        [HttpGet("Filter")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductByFilter(int? year, int? month, int? day, string desc, string catg)
        {
            return await _mediator.Send(new GetAllProductsByFilterQuery { Year = year, Month = month, Day = day, Description = desc, Category = catg });
        }

        // GET: api/Product/OverviewPricesProducts/Filter?year=2020&catg=test
        [HttpGet("OverviewPricesProducts/Filter")]
        public async Task<ActionResult<IEnumerable<OverviewPricesProduct>>> GetOverviewPriceProductsByFilter(int? year, string catg)
        {
            return await _mediator.Send(new GetOverviewProductPricesQuery { Year = year, Category = catg });
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(long id)
        {
            var product = await _mediator.Send(new GetProductByIdQuery { Id = id });

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Product/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(long id, UpdateProductCommand product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

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

            await _mediator.Send(product);

            return NoContent();
        }

        // POST: api/Product
        [HttpPost]
        public async Task<ActionResult<long>> PostProduct(CreateProductCommand product)
        {
            return await _mediator.Send(product);
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(long id)
        {
            await _mediator.Send(new DeleteProductCommand { Id = id });

            return NoContent();
        }
    }
}
