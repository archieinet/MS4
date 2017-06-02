using EfDatabase;
using Models;
using System;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebAPI.Controllers
{
    [EnableCors("http://localhost:63360",null,"GET,POST")]
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

            Profile p = new Profile();

            try
            {
                User u = new User
                {
                    UserName = UserName,
                    Email = Email,
                    Password = Password
                };
                p = db.ValidateLogin(u);
            }
            catch (Exception ex)
            {
                return InternalServerError(new Exception(ex.Message));
            }

            if (p.KeyID=="NOTFOUND")
                return NotFound();

            return Ok();
        }
    }
}
