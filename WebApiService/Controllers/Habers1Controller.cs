using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using DAL;

namespace WebApiService.Controllers
{
    public class Habers1Controller : ApiController
    {
        private IntranetContext db = new IntranetContext();

        // GET: api/Habers1
        public IQueryable<Haber> GetHaber()
        {
            return db.Haber;
        }

        // GET: api/Habers1/5
        [ResponseType(typeof(Haber))]
        public async Task<IHttpActionResult> GetHaber(int id)
        {
            Haber haber = await db.Haber.FindAsync(id);
            if (haber == null)
            {
                return NotFound();
            }

            return Ok(haber);
        }

        // PUT: api/Habers1/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutHaber(int id, Haber haber)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != haber.No)
            {
                return BadRequest();
            }

            db.Entry(haber).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HaberExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Habers1
        [ResponseType(typeof(Haber))]
        public async Task<IHttpActionResult> PostHaber(Haber haber)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Haber.Add(haber);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = haber.No }, haber);
        }

        // DELETE: api/Habers1/5
        [ResponseType(typeof(Haber))]
        public async Task<IHttpActionResult> DeleteHaber(int id)
        {
            Haber haber = await db.Haber.FindAsync(id);
            if (haber == null)
            {
                return NotFound();
            }

            db.Haber.Remove(haber);
            await db.SaveChangesAsync();

            return Ok(haber);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool HaberExists(int id)
        {
            return db.Haber.Count(e => e.No == id) > 0;
        }
    }
}