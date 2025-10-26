using System;
using Application.Profiles.Commands;
using FluentValidation;

namespace Application.Profiles.Validators;

public class UpdateProfileValidator : AbstractValidator<UpdateProfile.Command>
{
    public UpdateProfileValidator()
    {
        RuleFor(x => x.DisplayName).NotEmpty();
    }
}
