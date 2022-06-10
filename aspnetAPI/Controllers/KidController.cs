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
    public class KidController : ControllerBase
    {

        private IKidRepo _kidRepo;

        public KidController(IKidRepo kidRepo)
        {
            _kidRepo = kidRepo;
        }

        [HttpGet]
        [Route("KIDGetAll")]
        public IActionResult KIDGetAll()
        {
            return Ok(_kidRepo.KIDGetAll());
        }
    }
}
