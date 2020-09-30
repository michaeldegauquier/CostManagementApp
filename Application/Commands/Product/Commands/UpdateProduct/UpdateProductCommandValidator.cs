using FluentValidation;

namespace Application.Commands.Product.Commands.UpdateProduct
{
    public class UpdateProductCommandValidator : AbstractValidator<UpdateProductCommand>
    {
        public UpdateProductCommandValidator()
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
