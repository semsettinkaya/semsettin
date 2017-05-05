<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;
using System.Web.Script.Serialization;

public class Handler : IHttpHandler, System.Web.SessionState.IRequiresSessionState
{
    
    public void ProcessRequest (HttpContext context) {
        
        context.Response.ContentType = "text/plain";//"application/json";
        var r = new System.Collections.Generic.List<ViewDataUploadFilesResult>();
        JavaScriptSerializer js = new JavaScriptSerializer();
       
      
        foreach (string file in context.Request.Files)
        {
       
            HttpPostedFile hpf = context.Request.Files[file] as HttpPostedFile;
            string FileName = string.Empty;
            if (HttpContext.Current.Request.Browser.Browser.ToUpper() == "IE")
            {
                string[] files = hpf.FileName.Split(new char[] { '\\' });
                FileName = files[files.Length - 1];
            }
            else
            {
                FileName = hpf.FileName;
            }
            if (hpf.ContentLength == 0)
                continue;

            string savedFileName = context.Server.MapPath("UploadControl/" + FileName);
            hpf.SaveAs(savedFileName);


            if (context.Session["files"] == null)
            {
                System.Collections.Generic.List<HttpPostedFile> files = new System.Collections.Generic.List<HttpPostedFile>();
                files.Add(hpf);
                context.Session["files"] = files;
            }
            else
            {
                System.Collections.Generic.List<HttpPostedFile> files = context.Session["files"] as System.Collections.Generic.List<HttpPostedFile>;
                if(files==null)
                    files = new System.Collections.Generic.List<HttpPostedFile>();
                
                files.Add(hpf);
                
            }

            r.Add(new ViewDataUploadFilesResult()
            {
                //Thumbnail_url = savedFileName,
                Name = FileName,
                Length = hpf.ContentLength,
                Type = hpf.ContentType
            });
            var uploadedFiles = new
            {
                files = r.ToArray()
            };

            var jsonObj = js.Serialize(uploadedFiles);
            //jsonObj.ContentEncoding = System.Text.Encoding.UTF8;
            //jsonObj.ContentType = "application/json;";
            context.Response.Write(jsonObj.ToString());


        }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}

public class ViewDataUploadFilesResult
{
    public string Thumbnail_url { get; set; }
    public string Name { get; set; }
    public int Length { get; set; }
    public string Type { get; set; }
}