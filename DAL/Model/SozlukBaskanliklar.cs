using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class SozlukBaskanliklar
    {
        [Key]
        public int Id { get; set; }
        public string BaskanlikAdi { get; set; }
        public Nullable<int> OnemDerecesi { get; set; }
        public string Aciklama { get; set; }
        public Nullable<int> BolgeId { get; set; }
    }
}
