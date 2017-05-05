using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
   public class EkDosya
    {
        [Key]
        public int No { get; set; }
        public Nullable<int> HaberNo { get; set; }
        public string Ad { get; set; }
        //public string Boyut { get; set; }
        public string Adres { get; set; }
        public string DosyaTuru { get; set; }
        public Nullable<System.DateTime> Tarih { get; set; }
        public bool Onay { get; set; }
    }
}
