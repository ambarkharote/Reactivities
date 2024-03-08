
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
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
#pragma warning disable CS8602 // Dereference of a possibly null reference.
            return await Mediator.Send(new List.Query());
#pragma warning restore CS8602 // Dereference of a possibly null reference.
        }

        [HttpGet("{id}")] //api/activities/fdksdks
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
#pragma warning disable CS8602 // Dereference of a possibly null reference.
            return await Mediator.Send(new Details.Query{Id = id});
#pragma warning restore CS8602 // Dereference of a possibly null reference.
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
#pragma warning disable CS8602 // Dereference of a possibly null reference.
            await Mediator.Send(new Create.Command{ Activity = activity});
#pragma warning restore CS8602 // Dereference of a possibly null reference.

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, Activity activity )
        {
            activity.Id = id;
#pragma warning disable CS8602 // Dereference of a possibly null reference.

            await Mediator.Send(new Edit.Command { Activity = activity});
#pragma warning restore CS8602 // Dereference of a possibly null reference.


            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
#pragma warning disable CS8602 // Dereference of a possibly null reference.

            await Mediator.Send(new Delete.Command{Id = id});
#pragma warning restore CS8602 // Dereference of a possibly null reference.

            return Ok();
            
        }
    }
}