using FluentValidation;

namespace Application.Commands.Product.Commands.CreateProduct
{
    public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
    {
        public CreateProductCommandValidator()
        {
            RuleFor(v => v.DatePurchased)
                .NotNull()
                .NotEmpty();

            RuleFor(v => v.Description)
                .NotNull()
                .NotEmpty()
                .MaximumLength(200);

            RuleFor(v => v.Price)
                .NotNull();

            RuleFor(v => v.Paid)
                .NotNull();
        }
    }
}
