using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace intranet.Altyapi
{
    public class UserApp : IdentityUser
    {
        public string Name { get; set; }
        public string SurName { get; set; }

    }

 
}