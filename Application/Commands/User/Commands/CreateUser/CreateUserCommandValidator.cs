using FluentValidation;

namespace Application.Commands.User.Commands.CreateUser
{
    public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
    {
        public CreateUserCommandValidator()
        {
            RuleFor(v => v.Email)
                .NotNull()
                .NotEmpty()
                .EmailAddress();

            RuleFor(v => v.Password)
                .NotNull()
                .NotEmpty();
        }
    }
}
