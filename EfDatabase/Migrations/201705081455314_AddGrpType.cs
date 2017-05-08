using Models;


namespace EfDatabase.Migrations

{
    using System;
    using System.Data.Entity.Migrations;

    public partial class AddGrpType : DbMigration
    {
        public override void Up()
        {
            CreateTable(typeof(TblGroupType).Name,
        t => new
        {
            ID = t.Int(nullable: false),
            Description = t.String()
        }
    ).PrimaryKey(t => t.ID);

            foreach (var item in Enum.GetValues(typeof(TblGroupType)))
            {
                Sql(@"INSERT INTO " + typeof(TblGroupType).Name +
                    " SELECT " + (int)item + ", '" + item.ToString() + "'");
            }

            this.AddForeignKey("TblUser", "Type", typeof(TblGroupType).Name, "ID", name: "FKTblGroupType");
        }

        public override void Down()
        {
            this.DropForeignKey(typeof(TblGroupType).Name, "FKTblGroupType"); //cust name
            DropTable("dbo.TblGroupType");
        }
    }
}
