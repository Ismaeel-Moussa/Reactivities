using Microsoft.AspNetCore.Mvc;
using Application.Activities.Queries;
using Domain;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<ActivityDto>>> GetActivities()
        {
            return await Mediator.Send(new GetActivityList.Query());
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityDto>> GetActivity(string id)
        {
            return HandleResult(await Mediator.Send(new GetActivity.Query { Id = id }));
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateActivity(CreateActivityDto createActivityDto)
        {
            return HandleResult(await Mediator.Send(new CreateActivity.Command { CreateActivityDto = createActivityDto }));
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult> UpdateActivity(string id , UpdateActivityDto updateActivityDto)
        {
            return HandleResult(await Mediator.Send(new UpdateActivity.Command { UpdateActivityDto = updateActivityDto }));     
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult> DeleteActivity(string id)
        {      
            return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
        }

        [HttpPost("{id}/attend")]             
        public async Task<ActionResult> Attend(string id)
        {   
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
        }
    
    }
}