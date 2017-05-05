using intranet.Altyapi;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace intranet.Controllers
{
    public class UserController : Controller
    {
        
        public UserManagerApp userManagerApp
        {

            get
            {
                IOwinContext context = HttpContext.GetOwinContext();
                return context.GetUserManager<UserManagerApp>();
                //artık uygulamada kullanılabilecek bir usermanager app var
            }


        } //sadece değer dönecek


        // GET: User
        [Authorize] //asp.net framework ün bir özelliği
        public ActionResult Index()
        {
            return View(userManagerApp.Users);
        }
    }
}