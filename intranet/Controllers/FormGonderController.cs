using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace intranet.Controllers
{
    public class FormGonderController : Controller
    {
        // GET: FormGonder
        public ActionResult Index()
        {
            return View();
        }



        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create( Haber hbr) 
        {
         //   bool result = false;

          
                // List<Haber> Haberler = new List<Haber>();
            //    hbr.Baslik = form["txtSicilNo"];

         
            return View();
        }
    }
}