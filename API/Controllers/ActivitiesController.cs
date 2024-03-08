
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;
        public ActivitiesController(DataContext context)
        {
            _context = context;          
        }

        [HttpGet] //api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await _context.Activities.ToListAsync();
        }

        [HttpGet("{id}")] //api/activities/fdksdks
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
#pragma warning disable CS8604 // Possible null reference argument.

            return await _context.Activities.FindAsync(id);
#pragma warning restore CS8604 // Possible null reference argument.

        }
    }
}