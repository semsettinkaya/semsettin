using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace intranet.Altyapi
{
    public class UserManagerApp : UserManager<UserApp>
    {
        public UserManagerApp(IUserStore<UserApp> store) 
            : base(store)
        {
        }

        public static UserManagerApp create(IdentityFactoryOptions<UserManagerApp> IdentityFactoryOptions, Microsoft.Owin.IOwinContext owinContext)
        {
            UserAppDbContext context = owinContext.Get<UserAppDbContext>();
            UserManagerApp user = new UserManagerApp(new UserStore<UserApp>(context));


            PasswordValidator pass = new PasswordValidator
            {
                RequiredLength = 6,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = false,
                RequireNonLetterOrDigit = true
            };


            // UserValidator<UserApp> userValidator = new UserValidator<UserApp>(user)
            CustomUserValidator userValidator = new CustomUserValidator(user)
            {
                RequireUniqueEmail = true,
                AllowOnlyAlphanumericUserNames = true
            };

            user.PasswordValidator = pass;
            user.UserValidator = userValidator;

            return user;
        }

      
        

    }
}