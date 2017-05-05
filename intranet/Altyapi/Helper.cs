using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace intranet.Altyapi
{
    public static class Helper
    {

        public static string GetUserName(string Id)
        {
            return HttpContext.Current.GetOwinContext().GetUserManager<UserManagerApp>().FindById(Id).UserName;
         }

        public static IEnumerable<RoleApp>GetRoles()
        {
            return HttpContext.Current.GetOwinContext().GetUserManager<RoleAppManager>().Roles;

        }

        #region Şifre Çözme İşlemi
        public static string SifreCoz(string textParca)
        {
            string deCodeText = "";
            int karakterKodu = 0;
            char okunanKarakter;
            string ilkOkunan;
            string sonOkunan;
            string sb;
            if (textParca == "")
                return deCodeText;

            sb = textParca.Clone().ToString();
            ilkOkunan = sb[sb.Length - 1].ToString(); ;//ilk değer alınıyor

            for (int j = (sb.Length / 3) - 1; j > 0; j--)
            {
                sonOkunan = sb.Substring((j * 3) - 1, 1);
                sb = degistir(sb, j * 3 - 1, ilkOkunan);
                ilkOkunan = sonOkunan;
            }
            sb = sb.Substring(0, sb.Length - 1) + ilkOkunan;

            textParca = sb.Clone().ToString();
            deCodeText = "";

            for (int i = 0; i < textParca.Length / 3; i++)
            {
                karakterKodu = Convert.ToInt32(textParca.Substring((i * 3), 3));
                karakterKodu = (karakterKodu - (90 + (((i + (i + 1)) * 2) - i)));
                deCodeText += (char)karakterKodu;
            }
            return deCodeText;
        }
        public static string degistir(string temp, int j, string yeni)
        {
            string t;
            t = temp.Substring(0, j) + yeni + temp.Substring(j + 1, temp.Length - (j + 1));
            return t;
        }
        #endregion
    }
}