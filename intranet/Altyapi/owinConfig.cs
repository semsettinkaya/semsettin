using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using intranet.Altyapi;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.Identity;

namespace intranet
{
    public class owinConfig
    {
        public void Configuration(IAppBuilder app)
        {
            //istenilen altyapılar buradan sağlanmış oluyor
            app.CreatePerOwinContext<UserAppDbContext>(() => new UserAppDbContext());
            //her bir request işlemlerinde bu nesneyi delegate edecek

            app.CreatePerOwinContext<UserManagerApp>(UserManagerApp.create);
            //bu kullanıcıları yönetecek olan nesne ekleme silme çıkarma işlemleri 

            app.CreatePerOwinContext<RoleAppManager>(RoleAppManager.Create);

            //identity herhangi bir sayfaya kısıtlanmasının bilgisi için
            //kullanıcının cookie ile tutulmasını sağlar
            app.UseCookieAuthentication(new Microsoft.Owin.Security.Cookies.CookieAuthenticationOptions()
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie, //kullanıcı bilgileri cookie ile tutulacaktır
                LoginPath = new PathString("/Account/Login") // kullanıcı kısıtlı bir sayfaya girdiğinde yönlendirme yapmak
            });



            //rol tanımlamaları da bauradan yapılır..

            // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=316888


        }

  
    }
}
