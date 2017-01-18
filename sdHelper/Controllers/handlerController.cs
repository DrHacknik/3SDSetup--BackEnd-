using Newtonsoft.Json;
using Octokit;
using sdHelper.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;


namespace sdHelper.Controllers
{
    public class handlerController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage Get(String ver)
        {
            var server = HttpContext.Current.Server;
            var Request = HttpContext.Current.Request;
            var req_data = JsonConvert.DeserializeObject<dynamic>(ver);

            var r = new Random();
            int A = r.Next(1000, 5000);
            string stamp = A.ToString("X");

            Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/temp/" + stamp));

            strap.payload_url(req_data, stamp);
            strap.download_soundhax(req_data, stamp);
            strap.download_from_url("http://smealum.github.io/ninjhax2/starter.zip", stamp, "starter.zip");
            strap.extract_zip("starter.zip", stamp, true);
            Directory.Move(server.MapPath("~/temp/" + stamp + "/starter/3ds"), server.MapPath("~/temp/" + stamp + "/3ds"));
            Directory.Move(server.MapPath("~/temp/" + stamp + "/starter/boot.3dsx"), server.MapPath("~/temp/" + stamp + "/boot.3dsx"));
            Directory.Delete(server.MapPath("~/temp/" + stamp + "/starter"));

            strap.download_repo("", "",stamp);


            var response = strap.pack(stamp);

            //File.Delete(HttpContext.Current.Server.MapPath("~/temp/" + stamp));
            //File.Delete(HttpContext.Current.Server.MapPath("~/temp/" + stamp + ".zip"));

            return response;
            
            
        }
    }
}
