using Models;
using System;
using System.Data.Entity;
using System.Data.SqlClient;

namespace EfDatabase
{
    public class MS4DbContext: BaseContext<MS4DbContext>
    {
       
        public DbSet<User> Users { get; set; }
        public DbSet<FileUpload> FileUploads { get; set; }
        public DbSet<FileDetail> FileDetails { get; set; }

        //---LOGIN
        public Profile ValidateLogin(User usr)
        {
            var e = string.Empty;
            var u = string.Empty;
            var ident = new SqlParameter("@ident", System.Data.SqlDbType.VarChar, 200);
            ident.Direction = System.Data.ParameterDirection.Output;

            u = (usr.UserName ?? "") == "" ? "" : usr.UserName;
            e = usr.Email.IndexOf('@') > -1 ? usr.Email :
                (usr.UserName ?? "") == "" ? "" : usr.UserName;

            try
            {
                this.Database.ExecuteSqlCommand("usp_ValidateAcct @usr, @email, @pwd, @ident OUT",
                                new SqlParameter("@usr", System.Data.SqlDbType.VarChar, 100) { Value = u },
                                new SqlParameter("@email", System.Data.SqlDbType.VarChar, 50) { Value = e },
                                new SqlParameter("@pwd", System.Data.SqlDbType.VarChar, 50) { Value = usr.Password }, ident
                                );
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }


            return new Profile() { KeyID = ident.Value.ToString() };
        }


       
        
        
        
        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
            
        //}
    }
}
