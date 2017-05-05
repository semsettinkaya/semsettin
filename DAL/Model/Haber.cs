using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Haber
    {      
        [Key]
        public int No { get; set; }
        public int KullaniciId { get; set; }
        public int HaberTuru { get; set; }
        public string Baslik { get; set; }
        public string Icerik { get; set; }
        public Nullable<bool> EkDosyaVarMi { get; set; }
        public Nullable<bool> FotoGaleriMi { get; set; }
        public Nullable<System.DateTime> KayitTarihi { get; set; }
        public Nullable<System.DateTime> BaslangicTarihi { get; set; }
        public Nullable<System.DateTime> BitisTarihi { get; set; }
        public Nullable<int> OnemDerecesi { get; set; }
        public string Onaylayan { get; set; }
        public Nullable<System.DateTime> OnayTarihi { get; set; }
        public bool OnayDurumu { get; set; }
        public string OnayGerekcesi { get; set; }
        public string YayınYeri { get; set; }
    }
}
