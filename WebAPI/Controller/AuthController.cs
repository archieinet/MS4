using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebAPI.Controller
{
    public class AuthController : ApiController
    {

        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(new string[] { "Hello", "World" });
        }
    }
}
