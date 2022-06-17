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
    public class RiosvController : ControllerBase
    {

        private IRiosvRepo _riosvRepo;

        public RiosvController(IRiosvRepo riosvRepo)
        {
            _riosvRepo = riosvRepo;
        }

        [HttpGet]
        [Route("RIOSVGetAll")]
        public IActionResult RIOSVGetAll()
        {
            return Ok(_riosvRepo.RIOSVGetAll());
        }
    }
}
