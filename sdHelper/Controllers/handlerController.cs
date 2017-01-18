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
        public HttpResponseMessage Get(String ver,String step)
        {
            var server = HttpContext.Current.Server;
            var Request = HttpContext.Current.Request;
            var req_data = JsonConvert.DeserializeObject<dynamic>(ver);
            var step_list = JsonConvert.DeserializeObject<dynamic>(step);

            var r = new Random();
            int A = r.Next(1000, 5000);
            string stamp = A.ToString("X");

            Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/temp/" + stamp));

            for(int i = 0; i < step_list.Count; i++)
            {
                String actual_step = step_list[i].ToString();
                switch (actual_step)
                {

                }
            }

            //strap.download_repo("", "",stamp);


            var response = strap.pack(stamp);

            //File.Delete(HttpContext.Current.Server.MapPath("~/temp/" + stamp));
            //File.Delete(HttpContext.Current.Server.MapPath("~/temp/" + stamp + ".zip"));

           return response;
                      
        }
    }
}
