using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;

namespace intranet.Altyapi
{
    public class CustomPasswordValidator:PasswordValidator
    {

        public override Task<IdentityResult> ValidateAsync(string item)
        {
            return base.ValidateAsync(item);
        }
    }
}