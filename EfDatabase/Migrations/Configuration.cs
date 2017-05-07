namespace EfDatabase.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<EfDatabase.MS4DbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            
        }
        

        protected override void Seed(EfDatabase.MS4DbContext context)
        {
            
            //context.UserTypes.AddOrUpdate(
            //    t => t.Code, new Models.UserType
            //    {
            //        Code = "A",
            //        Description = "Admin"
            //    },
            //    new Models.UserType
            //    {
            //        Code = "U",
            //        Description = "Users"

            //    }
            //    ); //user types
          

            context.Users.AddOrUpdate(
                u => u.UserName, 
                    new Models.User
                    {
                        UserName = "archieinet",
                        Type = Models.TblGroupType.Admin,
                        Email = "archie@ctrwater.net",
                        CreateDate = DateTime.Now,
                        Active = true,
                        UpdateDate = DateTime.Now
                    },
                    new Models.User
                    {
                        UserName = "bo.li",
                        Type = Models.TblGroupType.Admin,
                        Email = "bo.li@ctrwater.net",
                        CreateDate = DateTime.Now,
                        Active = true,
                        UpdateDate = DateTime.Now
                    }, new Models.User
                    {
                        UserName = "WHusin",
                        Type = Models.TblGroupType.Agency,
                        Email = "William.Husin@ctrwater.net",
                        CreateDate = DateTime.Now,
                        Active = true,
                        UpdateDate = DateTime.Now
                    }
                ); //users
       }
    }
}
