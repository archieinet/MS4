using Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EfDatabase
{
    class MS4DbContext: BaseContext<MS4DbContext>
    {
        public DbSet<User> Users { get; set; }
        public DbSet<FileUpload> FileUploads { get; set; }
        public DbSet<FileDetail> FileDetails { get; set; }
       
       


        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
            
        //}
    }
}
