using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;

namespace intranet.Altyapi
{
    public class CustomUserValidator : UserValidator<UserApp>
    {
        public CustomUserValidator(UserManager<UserApp, string> manager) : base(manager)
        {
        }

        public override async Task<IdentityResult> ValidateAsync(UserApp item)
        {
            IdentityResult result = await base.ValidateAsync(item);

            var errors = result.Errors.ToList();
            if (!item.Email.EndsWith("@mgm.gov.tr"))
            {
                errors.Add("email adresiniz mgm uzantılı olmalıdır!");
                return new IdentityResult(errors);
            }
            return result;
            
        }
    }
}