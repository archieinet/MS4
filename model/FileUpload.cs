using System;
using System.Collections.Generic;
using System.Text;

namespace model
{
    public class FileUpload
    {
        public int ID { get; set; }
        public int UploadId { get; set; }
        public string UploadBy        { get; set; }
        public DateTime UploadDate { get; set; }
    }
}
