using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace intranet.Altyapi
{
    public class UserAppDbContext: IdentityDbContext<UserApp>
    {

        public UserAppDbContext()
            :base("intranetDB2")

        {

           Database.SetInitializer<UserAppDbContext>(new DropCreateDatabaseIfModelChanges<UserAppDbContext>());
           
        }


        private class UserAppDbContextInitializer : DropCreateDatabaseIfModelChanges<UserAppDbContext>
        {
            protected override void Seed(UserAppDbContext context)
            {
                //kayıt gerçekleşmiyor!!!
                context.Users.Add(new UserApp() { UserName = "sems", Email = "skaya@mgm.gov.tr", Name = "Şemsettin", PhoneNumber = "3022664", PasswordHash = "AEBa/wcSd+pN/J2GlQtJPDhTqzfy91BKdzc0sezmntAaRsZsz0+ht7qSmRU8JsiBUg==" });
                context.Users.Add(new UserApp() { UserName = "nurullah", Email = "ntavukcu@mgm.gov.tr", Name = "M. Nurullah", PhoneNumber = "3022664", PasswordHash = "AHf4ShwchpvwPI4Jo0R5MWXo53g700o1ythwWvBxu74IuFJalKxvOp94SN5/dUD0Ew==" });

                context.Roles.Add(new RoleApp() { Name = "Admin" });
                context.Roles.Add(new RoleApp() { Name = "User" });
                context.SaveChanges();

                base.Seed(context);
            }
        }
    }
}