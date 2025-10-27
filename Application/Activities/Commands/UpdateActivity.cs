using System;
using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class UpdateActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required UpdateActivityDto UpdateActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) 
    : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {

            var user = await userAccessor.GetUserAsync();

            var attendee = await context.ActivityAttendees
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.UserId == user.Id
                && x.ActivityId == request.UpdateActivityDto.Id, cancellationToken);
                
            if (attendee?.IsHost != true) 
                return Result<Unit>.Failure("Not authorized to update this activity: you are not the host", 403);

            var activity = await context.Activities
                .FindAsync([request.UpdateActivityDto.Id], cancellationToken);

            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);

            mapper.Map(request.UpdateActivityDto, activity);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failed to update the activity", 400);

            return Result<Unit>.Success(Unit.Value);
          
        }
    }
}
