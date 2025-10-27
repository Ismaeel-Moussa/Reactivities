using System;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using Persistence;

namespace Application.Profiles.Queries;

public class GetFollowings
{
    public class Query : IRequest<Result<List<UserProfileDto>>>
    {
        public required string Predicate { get; set; } = "followers";
        public required string UserId { get; set; }

    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor)
    : IRequestHandler<Query, Result<List<UserProfileDto>>>
    {
        public async Task<Result<List<UserProfileDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var profiles = new List<UserProfileDto>();
            
            switch (request.Predicate)
            {
                case "followers":
                    profiles = await context.UserFollowings
                        .Where(uf => uf.TargetId == request.UserId)
                        .Select(uf => uf.Observer)
                        .ProjectTo<UserProfileDto>(mapper.ConfigurationProvider, new {currentUserId = userAccessor.GetUserId()})
                        .ToListAsync(cancellationToken);
                    break;
                case "followings":
                    profiles = await context.UserFollowings
                        .Where(uf => uf.ObserverId == request.UserId)
                        .Select(uf => uf.Target)
                        .ProjectTo<UserProfileDto>(mapper.ConfigurationProvider, new {currentUserId = userAccessor.GetUserId()})
                        .ToListAsync(cancellationToken);
                    break;
            }

            return Result<List<UserProfileDto>>.Success(profiles);
        }
    }
}
