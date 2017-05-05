using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using DAL;

namespace intranet.Controllers
{
    public class HabersController : Controller
    {
        private IntranetContext db = new IntranetContext();

        // GET: Habers
        public ActionResult Index()
        {
            return View(db.Haber.ToList());
        }

        // GET: Habers/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Haber haber = db.Haber.Find(id);
            if (haber == null)
            {
                return HttpNotFound();
            }
            return View(haber);
        }

        // GET: Habers/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Habers/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "No,KullaniciId,HaberTuru,Baslik,Icerik,EkDosyaVarMi,FotoGaleriMi,KayitTarihi,BaslangicTarihi,BitisTarihi,OnemDerecesi,Onaylayan,OnayTarihi,OnayDurumu,OnayGerekcesi,YayınYeri")] Haber haber)
        {
            if (ModelState.IsValid)
            {
                db.Haber.Add(haber);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(haber);
        }

        // GET: Habers/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Haber haber = db.Haber.Find(id);
            if (haber == null)
            {
                return HttpNotFound();
            }
            return View(haber);
        }

        // POST: Habers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "No,KullaniciId,HaberTuru,Baslik,Icerik,EkDosyaVarMi,FotoGaleriMi,KayitTarihi,BaslangicTarihi,BitisTarihi,OnemDerecesi,Onaylayan,OnayTarihi,OnayDurumu,OnayGerekcesi,YayınYeri")] Haber haber)
        {
            if (ModelState.IsValid)
            {
                db.Entry(haber).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(haber);
        }

        // GET: Habers/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Haber haber = db.Haber.Find(id);
            if (haber == null)
            {
                return HttpNotFound();
            }
            return View(haber);
        }

        // POST: Habers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Haber haber = db.Haber.Find(id);
            db.Haber.Remove(haber);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
