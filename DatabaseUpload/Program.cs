using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using System.Data.OleDb;
using System.ComponentModel;
using System.Net;
using System.IO;

namespace DatabaseUpload
{
    class Program
    {


       static  void Main(string[] args)
        {
         MainAsync();

        }

        static async Task MainAsync()
        {
            try
            {
                Console.WriteLine("İntranet  haber.mdb veritabanı için işlemler başlatıldı!");
                using (IntranetContext intdb = new IntranetContext())
                {

                    using (var conection = new OleDbConnection("Provider=Microsoft.JET.OLEDB.4.0;" + "data source=Data\\HABER.mdb;"))
                    {
                        conection.Open();
                        Console.WriteLine("HABER.mdb'ye bağlandı...");
                        var query = "Select * From haberler";
                        var command = new OleDbCommand(query, conection);
                        var reader = command.ExecuteReader();
                        while (reader.Read())
                        {
                           bool ekdosyaVarmi = false;

                            //ek dosya varmı ve link değilse
                            if (!string.IsNullOrEmpty(reader[3].ToString()) && reader[3].ToString().IndexOf("http") == -1)
                            {
                                string yol = reader[3].ToString().Substring(8, reader[3].ToString().IndexOf("target") - 8).Trim();
                                string dosya = yol.Substring(yol.LastIndexOf("/") + 1, yol.Length - yol.LastIndexOf("/") - 1);

                                    ekdosyaVarmi = true;
                                  await  DownloadFile(yol, dosya, reader[0].ToString(), DateTime.Parse(reader[6].ToString().Substring(0, 10)));

                            }


                            intdb.Haber.Add(new Haber()
                            {
                                Baslik = reader[1].ToString(),
                                Icerik = reader[2].ToString(),
                                EkDosyaVarMi= ekdosyaVarmi,
                                KayitTarihi = DateTime.Parse(reader[6].ToString().Substring(0, 10)),
                                BaslangicTarihi = DateTime.Parse(reader[6].ToString().Substring(0, 10)),
                                BitisTarihi = DateTime.Parse(reader[6].ToString().Substring(0, 10)).AddDays(3),
                                FotoGaleriMi=false
                            });



                        }
                        intdb.SaveChanges();
                        Console.WriteLine("Haberler eklendi!");
                    }

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Hata: " + ex.Message);
            }

          var tut =  Console.ReadLine();
        
        }
        const string Root = "D://IntranetFiles/Data/EkDosyalar/";
        private static async Task DownloadFile(string url, string dosya, string haberno, DateTime kayitTarihi)
        {
            //if (!url.EndsWith(".pdf"))  dosya kontrolü
            //{
            //    return;
            //}
            
            #region path

            string HaberNo = string.Format("{0:000}", haberno);

            DateTime dt = kayitTarihi;
            string yil = dt.ToString("yyyy");
            string ay = dt.ToString("MM");
            string gun = dt.ToString("dd");
            if (!Directory.Exists(Resource.DataPath))
                Directory.CreateDirectory(Resource.DataPath);

            if (!Directory.Exists(Path.Combine((Root), yil)))
                Directory.CreateDirectory(Path.Combine((Root), yil));

            if (!Directory.Exists(Path.Combine((Root), yil, ay)))
                Directory.CreateDirectory(Path.Combine((Root), yil, ay));

            if (!Directory.Exists(Path.Combine((Root), yil, ay,gun)))
                Directory.CreateDirectory(Path.Combine((Root), yil, ay,gun));

            if (!Directory.Exists(Path.Combine((Root), yil, ay,gun, HaberNo)))
             Directory.CreateDirectory(Path.Combine((Root), yil, ay,gun, HaberNo));

            var yolumuz = Path.Combine((Root), yil, ay, HaberNo);
            #endregion


            string path = Path.Combine((Root), yil, ay,gun, HaberNo, dosya);

                using (IntranetContext db = new IntranetContext())
                {
                    db.EkDosya.Add(new EkDosya()
                    {
                        Ad = dosya,
                        Adres = path,
                        HaberNo = int.Parse(haberno),
                        Tarih = DateTime.Now,
                        DosyaTuru = dosya.Substring(dosya.LastIndexOf(".")+1),
                        Onay=false
                    });
                db.SaveChanges();
                }


            using (var client = new WebClient())
            {
               client.DownloadFileTaskAsync(new Uri("http://intranet.mgm.gov.tr/" + url),
                                    path).Wait();
            }
        }
    }
}
