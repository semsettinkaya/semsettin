using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class SozlukHaberTurleri
    {
        [Key]
        public int Id { get; set; }
        public string TurAdi { get; set; }
        public string Icon { get; set; }
        public string StilAdi { get; set; }

    }
}
