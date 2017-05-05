using intranet.Altyapi;
using intranet.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.Owin.Security;
using Sybase.Data.AseClient;
using System.Data;

namespace intranet.Controllers.Admin
{
    public class AccountController : Controller
    {

        public UserManagerApp userManagerApp
        {

            get
            {
                IOwinContext context = HttpContext.GetOwinContext();
                return context.GetUserManager<UserManagerApp>();
            }


        }

        // GET: Account
        public ActionResult Index()
        {
            return View(userManagerApp.Users);
        }

        public ActionResult Create()
        {

            return View(new UserApp());
        }

        [HttpPost]
        public async Task<ActionResult>Create(UserApp user, string password)
        {
            UserApp u = new UserApp();
            u.UserName = user.UserName;
            u.Email = user.Email;
          IdentityResult result= await userManagerApp.CreateAsync(u, password);

            if (result.Succeeded)
            {
                return RedirectToAction("Index");
            }
            else
            {
                foreach (var item in result.Errors.ToList())
                {
                    ModelState.AddModelError("", item);
                }
            }

            return View();
        }


        public async Task<ActionResult> Edit(string Id)
        {
            UserApp user = await userManagerApp.FindByIdAsync(Id);
            if (user != null)
            {
                return View(user);

            }
            else
            {
                ModelState.AddModelError("","Böyle Bir Üye Bulunmamaktadır");

                return View(new UserApp());
            }

        }

        [HttpPost]
        public async Task<ActionResult> Edit(UserApp user, string password)
        {
          UserApp usr = await userManagerApp.FindByIdAsync(user.Id);
            usr.UserName = user.UserName;
            usr.Email = user.Email;

            usr.PasswordHash = userManagerApp.PasswordHasher.HashPassword(password);
            IdentityResult result = await userManagerApp.UpdateAsync(usr);

            if (result.Succeeded)
            {
              return   RedirectToAction("Index");
            }
                result.Errors.ToList().ForEach(x => ModelState.AddModelError("", x));
                return View(usr);


        }


        public async Task<ActionResult> Delete(string Id)
        {
            UserApp user = await userManagerApp.FindByIdAsync(Id);
            IdentityResult result = await userManagerApp.DeleteAsync(user);

            if (result.Succeeded)
            {
                return RedirectToAction("Index");
            }
            else
            {
              //hata alınca yönlendir!!
            }

            return View();

        }


        [AllowAnonymous]
        public ActionResult Login(string ReturnUrl)
        {
            ViewBag.url = ReturnUrl;
            return View(new UserLoginModel());

        }


        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Login(UserLoginModel user, string ReturnUrl)
        {

            if (ModelState.IsValid)
            {
              UserApp userEmail=  userManagerApp.FindByEmail(user.Email);
                if (userEmail == null)
                {
                    ModelState.AddModelError("", "Böyle Bir kullanıcı yok!");
                    return View(user);
                }

                    UserApp CurrentUser = await  userManagerApp.FindAsync(userEmail.UserName, user.Password);

                string kodluSifre = "";
                using (SamyeliDB vts = new SamyeliDB())
                {
                   
                    AseDataReader dr = vts.ExecuteReader("firtina.istakip", CommandType.StoredProcedure, "0", "53566250068");
                //if (dr == null)
                //{
                //   // HttpContext.Current.Session["Kullanici"] = null;
                //    return null;
                //}
                while (dr.Read())
                    kodluSifre = dr[0].ToString().Trim();

                dr.Close();
                dr.Dispose();
                dr = null;
                };

               
                
                if (kodluSifre.Length == 0 || Helper.SifreCoz(kodluSifre) != user.Password)
                {
                    //HttpContext.Current.Session["Kullanici"] = null;
                    //return null;
                }


                if (CurrentUser == null)
                {
                    ModelState.AddModelError("","Email veya şifreniz yanlış");
                }
                else
                {
                    ClaimsIdentity ident = await userManagerApp.CreateIdentityAsync(CurrentUser,
                        DefaultAuthenticationTypes.ApplicationCookie);

                    HttpContext.GetOwinContext().Authentication.SignOut();
                    //önce kullanıcıyı çıkartmak gerek eski bir cookie si varsa siler

                    HttpContext.GetOwinContext().Authentication.SignIn(new AuthenticationProperties()
                    {
                        IsPersistent=true // eğer true ise sizin cookie nizi silmez sizi hatırlar tekrar tekrar giriş yapabilirsiniz
                    },ident);

                }
                if (!string.IsNullOrEmpty(ReturnUrl))
                {
                    return Redirect(ReturnUrl);
                }
                else
                {
                    return RedirectToAction("Index", "Anasayfa");

                }
                

            }

            else
            {
                return View(user);
            }



        }


        



    }


}