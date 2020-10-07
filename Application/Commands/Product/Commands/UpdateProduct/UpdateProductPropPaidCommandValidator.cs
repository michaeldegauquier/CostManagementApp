using FluentValidation;

namespace Application.Commands.Product.Commands.UpdateProduct
{
    public class UpdateProductPropPaidCommandValidator : AbstractValidator<UpdateProductPropPaidCommand>
    {
        public UpdateProductPropPaidCommandValidator()
        {
            RuleFor(v => v.Paid)
                .NotNull();
        }
    }
}
