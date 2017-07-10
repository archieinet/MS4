using System;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebAPI.Controllers
{
    [EnableCors("http://localhost:63360/", null, "GET,POST")]
    public class UploadFileController : ApiController
    {

        [HttpGet]
        public string[] Get()
        {
            return new string[] { "hello", "World" };
        }

       [HttpPost]
        public async Task<HttpResponseMessage> Post()
        {
            try
            {
                if (!Request.Content.IsMimeMultipartContent())
                {
                    throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
                }

                var getPath = ConfigurationManager.AppSettings["AttachementPath"];
                var provider = new MultipartFormDataStreamProvider(getPath);
                var result = await Request.Content.ReadAsMultipartAsync(provider);

                //Get the JSON data
                string model = result.FormData["model"];
                /*
                HUPApplication.HUPApplicationValue application = new HUPApplication.HUPApplicationValue();
                if (model == null)
                {
                    throw new HttpResponseException(HttpStatusCode.BadRequest);
                }
                else
                {
                    application = JsonConvert.DeserializeObject<HUPApplication.HUPApplicationValue>(model);
                }

                if (result.FileData.Count == 0)
                {
                    application.AttachmentURL = "No";
                }
                else
                {
                    application.AttachmentURL = "Yes";
                }

                string ConfirmationNo = HUPApplication.InsertAppInfo(application);

                if (ConfirmationNo == "Error" || ConfirmationNo == "")
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError, "Insert Application Failed");//500
                }
                else
                {
                    //get the posted files
                    if (result.FileData.Count > 0)
                    {
                        int FileCount = 0;
                        string filenames = "";
                        foreach (MultipartFileData fileData in result.FileData)
                        {
                            if (!string.IsNullOrEmpty(fileData.Headers.ContentDisposition.FileName))
                            {
                                string fileName = fileData.Headers.ContentDisposition.FileName;
                                if (fileName.StartsWith("\"") && fileName.EndsWith("\""))
                                {
                                    fileName = fileName.Trim('"');
                                }
                                if (fileName.Contains(@"/") || fileName.Contains(@"\"))
                                {
                                    fileName = Path.GetFileName(fileName);
                                }
                                FileCount++;

                                string ext = Path.GetExtension(fileName);
                                File.Move(fileData.LocalFileName, Path.Combine(getPath, ConfirmationNo + "-" + FileCount.ToString() + ext));
                                filenames = filenames + ConfirmationNo + "-" + FileCount.ToString() + ext + ";";
                            }
                        }

                        Boolean IsUpdated = HUPApplication.UpdateAttachmentName(filenames.TrimEnd(';'), Convert.ToInt32(ConfirmationNo));
                        if (!IsUpdated) return Request.CreateResponse(HttpStatusCode.InternalServerError, "Update Attachment Name Failed");//500
                    }

                    return Request.CreateResponse(HttpStatusCode.Created, ConfirmationNo);//201
                }
                */
                return Request.CreateResponse(HttpStatusCode.Created, 123456);//201

            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);//400
            }
        }
    }
}
