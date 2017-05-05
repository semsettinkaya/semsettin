using intranet.Altyapi;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace intranet.Controllers.Admin
{
    public class RoleController : Controller
    {
        public UserManagerApp userManagerApp
        {

            get
            {
                IOwinContext context = HttpContext.GetOwinContext();
                return context.GetUserManager<UserManagerApp>();
            }

        }

        public RoleAppManager roleAppManagerr //rollerin yönetileceği property
        {
            get{ return HttpContext.GetOwinContext().GetUserManager<RoleAppManager>(); }
        }

        [Authorize(Roles ="yonetici")]
        public ActionResult Index()
        {
            return View(roleAppManagerr.Roles);
        }

        public ActionResult Create()
        {
            return View(new RoleApp());
        }

        [HttpPost]
        public ActionResult Create(RoleApp role)
        {
            roleAppManagerr.Create(role);
            return RedirectToActionPermanent("Index");
        }


        public ActionResult Yonetim()
        {
            return View(userManagerApp.Users);
        }

        [HttpPost]
        public ActionResult Yonetim(IEnumerable<string> RoleNames, string userId)
        {
            IEnumerable<string> rolenames = RoleNames ?? new List<string>();

            IEnumerable<string> SelectRoleNames = rolenames;

            IEnumerable<string> UnSelectedRoleNames = Helper.GetRoles().Select(a => a.Name).Except(rolenames);




            foreach (string rolename in SelectRoleNames.ToList())
            {
                if (!userManagerApp.IsInRole(userId, rolename))
                {
                    userManagerApp.AddToRole(userId, rolename);
                }
            }


            foreach (string selectedname in UnSelectedRoleNames.ToList())
            {
                if (userManagerApp.IsInRole(userId, selectedname))
                {
                    userManagerApp.RemoveFromRoles(userId, selectedname);
                }
            }

            return RedirectToAction("Index");

        }

    }
}