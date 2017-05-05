using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApiService.Controllers
{
    public class ServiceController : ApiController
    {
        // GET: api/Service
        public List<Haber> Get()
        {
            using (IntranetContext intdb = new IntranetContext())

            {
                try
                {
                     intdb.Haber.ToList();
                }
                catch (Exception ex )
                {

                }
                return intdb.Haber.ToList();
            }

        }

        // GET: api/Service/5
        public Haber Get(int id)
        {
            using (IntranetContext intdb = new IntranetContext())

            {
                try
                {
                  return  intdb.Haber.Single(x => x.No == id);
                }
                catch (Exception ex)
                {
                    return new Haber();
                }
               
            }
        }

        // POST: api/Service
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Service/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Service/5
        public void Delete(int id)
        {
        }
    }
}
