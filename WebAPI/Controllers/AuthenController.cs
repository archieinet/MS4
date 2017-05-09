using EfDatabase;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebAPI.Controllers
{
    public class AuthenController : ApiController
    {
        readonly MS4DbContext db;
        public AuthenController()
        {
            db = new MS4DbContext();
            
        }


        [HttpGet]
        public IHttpActionResult Login(string UserName, string Email, string Password)
        {
            User u = new User
            {
                UserName = UserName,
                Email = Email,
                Password = Password
            };
           Profile p =  db.ValidateLogin(u);

            return Ok(new { guid = p.KeyID});
        }
    }
}
