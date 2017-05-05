using DAL;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace intranet.Controllers
{
    public class FormlarController : Controller
    {
        // GET: Formlar
        public async Task<ActionResult> Index()
        {
            using (HttpClient client = new HttpClient())
            {
                var response = await client.GetAsync("http://localhost:55712/api/Service");
                var model = JsonConvert.DeserializeObject<List<Haber>>(response.Content.ReadAsStringAsync().Result);
                return View(model);

            }

        }
    }
}