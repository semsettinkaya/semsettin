using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model
{
  public  class Kullanici
    {
        [Key]
        public int Id { get; set; }
        public String TcKimlikNo { get; set; }
        public string Adi { get; set; }
        public string Soyadi { get; set; }
        public string Unvani { get; set; }
        public Nullable<int> Sicil { get; set; }
        public string Bolge { get; set; }
        public string Baskanlik { get; set; }
        public string FiiliCalistigiYer { get; set; }        
        public string Eposta { get; set; }
        public string Telefon { get; set; }
    }
}
