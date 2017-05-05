using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace intranet.Altyapi
{
    public class RoleApp:IdentityRole
    {

        public RoleApp():base()
        {

        }

        public RoleApp(string name)
            :base(name)
        {
        }


    }
}