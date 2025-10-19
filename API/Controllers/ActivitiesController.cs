using Microsoft.AspNetCore.Mvc;
using Application.Activities.Queries;
using Domain;
using Application.Activities.Commands;
using Application.Activities.DTOs;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new GetActivityList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(string id)
        {
            return HandleResult(await Mediator.Send(new GetActivity.Query { Id = id }));
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateActivity(CreateActivityDto createActivityDto)
        {
            return HandleResult(await Mediator.Send(new CreateActivity.Command { CreateActivityDto = createActivityDto }));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateActivity(UpdateActivityDto updateActivityDto)
        {
            return HandleResult(await Mediator.Send(new UpdateActivity.Command { UpdateActivityDto = updateActivityDto }));     
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(string id)
        {      
            return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
        }

        
    
    }
}