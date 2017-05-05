namespace DAL
{
    using DAL.Model;
    using System;
    using System.Data;
    using System.Data.Entity;
    using System.Data.OleDb;
    using System.Linq;

    public class IntranetContext : DbContext
    {
        // Your context has been configured to use a 'IntranetContext' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'DAL.IntranetContext' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'IntranetContext' 
        // connection string in the application configuration file.
        public IntranetContext()
            : base("name=intranetDB2")
        {
            Database.SetInitializer(new Configuration());
        }

     

        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

        public virtual DbSet<Haber> Haber { get; set; }
        public virtual DbSet<Kullanici> Kullanici { get; set; }
        public virtual DbSet<EkDosya> EkDosya { get; set; }
        public virtual DbSet<SozlukBaskanliklar> SozlukBaskanliklar { get; set; }
        public virtual DbSet<SozlukHaberTurleri> SozlukHaberTurleri { get; set; }
    }

  
        public class Configuration:DropCreateDatabaseIfModelChanges<IntranetContext>
    {
        protected override void Seed(IntranetContext context)
        {
            context.SozlukHaberTurleri.Add(new SozlukHaberTurleri() { Id = 0, TurAdi = "Haber", Icon = "haber", StilAdi = "haber" });
            context.SozlukHaberTurleri.Add(new SozlukHaberTurleri() { Id = 1, TurAdi = "Düðün", Icon = "dugun", StilAdi = "dugun" });
            context.SozlukHaberTurleri.Add(new SozlukHaberTurleri() { Id = 2, TurAdi = "Doðum", Icon = "dogum", StilAdi = "dogum" });
            context.SozlukHaberTurleri.Add(new SozlukHaberTurleri() { Id = 3, TurAdi = "Vefat", Icon = "vefat", StilAdi = "vefat" });
            context.SozlukHaberTurleri.Add(new SozlukHaberTurleri() { Id = 4, TurAdi = "Kan Aranýyor", Icon = "kan", StilAdi = "kan" });
            context.SozlukHaberTurleri.Add(new SozlukHaberTurleri() { Id = 5, TurAdi = "Boþ Kadro", Icon = "bosKadro", StilAdi = "bosKadro" });
            context.SozlukHaberTurleri.Add(new SozlukHaberTurleri() { Id = 6, TurAdi = "Geçici Görev", Icon = "gecici_gorev", StilAdi = "gecici_gorev" });

            context.Kullanici.Add(new Kullanici() { Id=0, TcKimlikNo = "53566250068", Adi = "Þemsettin", Soyadi = "KAYA", Sicil=901, Eposta="skaya@mgm.gov.tr",Telefon="3022664", Baskanlik = "Meteorolojik Veri Ýþlem Dairesi Baþkanlýðý", FiiliCalistigiYer = "Yazýlým ve Donaným Þube Müdürlüðü" });
            context.Kullanici.Add(new Kullanici() { Id=1, TcKimlikNo = "12181966846", Adi = "M. Nurullah", Soyadi = "TAVUKCU", Sicil=2907, Eposta = "ntavukcu@mgm.gov.tr", Telefon = "3022664", Baskanlik = "Meteorolojik Veri Ýþlem Dairesi Baþkanlýðý", FiiliCalistigiYer = "Yazýlým ve Donaným Þube Müdürlüðü" });

            context.Haber.Add(new Haber() {No=0, Baslik="Meteoroloji Genel Müdürülüðü", Icerik="Ýntranet Sayfasý Yenilendi",
                                           BaslangicTarihi=DateTime.Now, BitisTarihi=DateTime.Now.AddDays(3), EkDosyaVarMi=false, FotoGaleriMi=false,
                                           KayitTarihi=DateTime.Now, HaberTuru=0, KullaniciId=0, OnayDurumu=false });


            context.EkDosya.Add(new EkDosya() {No=0, Onay=false, Tarih =DateTime.Now, HaberNo=0,   Ad = "dosya", Adres= @"D://IntranetFiles/Data/EkDosyalar/2017\01\04\12\2017BakanimizinMetni.pdf", DosyaTuru="pdf"});


            context.SaveChanges();


        }

    }

    //public class MyEntity
    //{
    //    public int Id { get; set; }
    //    public string Name { get; set; }
    //}
}