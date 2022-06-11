using aspnetDAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace aspnetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityTypeController : ControllerBase
    {

        private IActivityTypeRepo _activityTypeRepo;

        public ActivityTypeController(IActivityTypeRepo activityTypeRepo)
        {
            _activityTypeRepo = activityTypeRepo;
        }

        [HttpGet]
        [Route("ActivitiesGetAll")]
        public IActionResult ActivitiesGetAll()
        {
            return Ok(_activityTypeRepo.ActivitiesGetAll());
        }
    }
}
