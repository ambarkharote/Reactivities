
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly IMediator _mediator;
        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;          
        }

        [HttpGet] //api/activities
        public async Task<IActionResult> GetActivities()
        {

            return HandleResult(await Mediator.Send(new List.Query()));

        }

        [HttpGet("{id}")] //api/activities/fdksdks
        public async Task<IActionResult> GetActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));   
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {

          return HandleResult(await Mediator.Send(new Create.Command{ Activity = activity}));

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, Activity activity )
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}