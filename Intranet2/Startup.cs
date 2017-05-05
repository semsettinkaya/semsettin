using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Intranet2.Startup))]
namespace Intranet2
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
