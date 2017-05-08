using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("TblUser")]
    public class User
    {
        [Key]
        public int ID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public TblGroupType Type { get; set; }
        public bool Active { get; set; }
        public DateTime UpdateDate { get; set; }
        public DateTime CreateDate { get; set; }

    }

 
    public enum TblGroupType
    {
        Admin = 1,
        Agency = 2
    }

    [Table("TblFileUpload")]
    public class FileUpload
    {
        [Key]
        public int ID { get; set; }
        public int UploadId { get; set; }
        [ForeignKey("UploadId")]
        public FileDetail Files { get; set; }
        public string UploadBy { get; set; }
        public DateTime UploadDate { get; set; }
    }


    [Table("TblFileDetail")]
    public class FileDetail
    {
       [Key]
        public int ID { get; set; }
        public int UploadId { get; set; }
        public string FileName { get; set; }
        public string FileLocation { get; set; }

    }

  
}

