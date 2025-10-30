using System;
using Application.Core;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetUserActivities
{
    public class Query : IRequest<Result<List<UserActivityDto>>>
    {
        public required string UserId { get; set; }
        public required string Filter { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<List<UserActivityDto>>>
    {
        public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var today = DateTime.UtcNow;

            var query = context.ActivityAttendees
                .Where(x => x.UserId == request.UserId)
                .AsQueryable();

            query = request.Filter switch
            {
                "past" => query.Where(a => a.Activity.Date <= today ),
                "future" => query.Where(a => a.Activity.Date >= today ),
                _ => query.Where(a => a.IsHost), 
            };

            var projectedActivities = query
                .OrderBy(a => a.Activity.Date)
                .Select(a => a.Activity) 
                .ProjectTo<UserActivityDto>(mapper.ConfigurationProvider);

            var activities = await projectedActivities.ToListAsync(cancellationToken);

            return Result<List<UserActivityDto>>.Success(activities);
        }
    }
}
