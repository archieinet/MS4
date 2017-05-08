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
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(EfDatabase.MS4DbContext context)
        {
            context.Users.AddOrUpdate(
                u => u.UserName,
                    new Models.User
                    {
                        UserName = "archieinet",
                        Type = Models.TblGroupType.Admin,
                        Email = "archie@ctrwater.net",
                        Password = "12345",
                        CreateDate = DateTime.Now,
                        Active = true,
                        UpdateDate = DateTime.Now
                    },
                    new Models.User
                    {
                        UserName = "bo.li",
                        Type = Models.TblGroupType.Admin,
                        Email = "bo.li@ctrwater.net",
                        Password = "8523",
                        CreateDate = DateTime.Now,
                        Active = true,
                        UpdateDate = DateTime.Now
                    }, new Models.User
                    {
                        UserName = "WHusin",
                        Type = Models.TblGroupType.Agency,
                        Email = "William.Husin@ctrwater.net",
                        Password = "8795",
                        CreateDate = DateTime.Now,
                        Active = true,
                        UpdateDate = DateTime.Now
                    }
                ); //users
        }
    }
}
