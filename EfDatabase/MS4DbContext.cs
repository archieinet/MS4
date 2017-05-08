﻿using Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EfDatabase
{
    public class MS4DbContext: BaseContext<MS4DbContext>
    {
        public DbSet<User> Users { get; set; }
        public DbSet<FileUpload> FileUploads { get; set; }
        public DbSet<FileDetail> FileDetails { get; set; }


        public Profile ValidateLogin(User usr)
        {
            var e = string.Empty;
            var u = string.Empty;
            var ident = new SqlParameter
            {
                SqlDbType = System.Data.SqlDbType.VarChar,
                ParameterName = "@ident",
                Direction = System.Data.ParameterDirection.Output
            };

            u = (usr.UserName ?? "") == "" ? "" : usr.UserName;
            e = usr.Email.IndexOf('@') > -1 ? usr.Email :
                (usr.UserName ?? "") == "" ? "" : usr.UserName;

            this.Database.ExecuteSqlCommand("usp_ValidateAcct @usr, @email, @pwd, @ident OUT",
                new SqlParameter("usr", System.Data.SqlDbType.VarChar) { Value = u },
                new SqlParameter("email", System.Data.SqlDbType.VarChar) { Value = e },
                new SqlParameter("pwd", System.Data.SqlDbType.VarChar) { Value = usr.Password }, ident
                );

            return new Profile { KeyID = ident.Value.ToString() };
        }

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
            
        //}
    }
}
