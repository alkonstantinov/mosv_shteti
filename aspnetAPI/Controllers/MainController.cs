﻿using aspnetAPI.Tools;
using aspnetBO;
using aspnetBO.MainTable;
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
    public class MainController : ControllerBase
    {

        private IMainRepo _mainRepo;

        public MainController(IMainRepo mainRepo)
        {
            _mainRepo = mainRepo;
        }

        [HttpGet]
        [Route("MainTableGetAll")]
        public IActionResult MainTableGetAll([FromQuery] int startIndex, int count, bool isDeleted)
        {
            return Ok(_mainRepo.MainTableGetAll(startIndex, count, false));
        }

        [HttpGet]
        [Route("DamageGetAll")]
        public IActionResult DamageGetAll([FromQuery] int startIndex, int count)
        {
            return Ok(_mainRepo.DamageGetAll(startIndex, count));
        }

        [HttpGet]
        [Route("MenaceGetAll")]
        public IActionResult MenaceGetAll([FromQuery] int startIndex, int count)
        {
            return Ok(_mainRepo.MenaceGetAll(startIndex, count));
        }

        [HttpGet]
        [Route("GetRecordsCount")]
        public IActionResult GetRecordsCount([FromQuery] bool isDamage)
        {
            return Ok(_mainRepo.GetRecordsCount(isDamage));
        }

        [HttpGet]
        [Route("MainTableGetById")]
        public IActionResult MainTableGetById([FromQuery] int id)
        {
            MainTable result = _mainRepo.MainTableGetById(id);
            return Ok(result);
        }

        [HttpPost]
        [Route("TableDownload")]
        public IActionResult TableDownload([FromBody] StringValue data)
        {
            List<string> h = new List<string>();
            List<List<string>> r = new List<List<string>>();
            List<string> row = new List<string>();
            row.Add(data.Value);
            r.Add(row);
            string fnm = "report.doc";

            var result = new Exporter(r, h, "Automacially generated table").Export("html");

            return File(result, "application/octet-stream", fnm);
        }

        [HttpPost]
        [Route("MainTableInsert")]
        public IActionResult MainTableInsert([FromBody] MainTable mt)
        {
            return Ok(_mainRepo.MainTableInsert(mt));
        }

        [HttpPut]
        [Route("MainTableUpdate")]
        public IActionResult MainTableUpdate([FromBody] MainTable mt)
        {
            return Ok(_mainRepo.MainTableInsert(mt));
        }
    }
}
