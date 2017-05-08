namespace EfDatabase.Migrations
{
    using Models;
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TblFileDetail",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        UploadId = c.Int(nullable: false),
                        FileName = c.String(),
                        FileLocation = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.TblFileUpload",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        UploadId = c.Int(nullable: false),
                        UploadBy = c.String(),
                        UploadDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.TblFileDetail", t => t.UploadId, cascadeDelete: true)
                .Index(t => t.UploadId);
            
            CreateTable(
                "dbo.TblUser",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        UserName = c.String(),
                        Email = c.String(),
                        Type = c.Int(nullable: false),
                        Active = c.Boolean(nullable: false),
                        UpdateDate = c.DateTime(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            //---- Add grouptype --manually
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

            this.AddForeignKey("TblUser", "Type", typeof(TblGroupType).Name, "ID",name:"FKTblGroupType");
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TblFileUpload", "UploadId", "dbo.TblFileDetail");
            this.DropForeignKey(typeof(TblGroupType).Name, "FKTblGroupType"); //cust name
            DropIndex("dbo.TblFileUpload", new[] { "UploadId" });
            DropTable("dbo.TblUser");
            DropTable("dbo.TblFileUpload");
            DropTable("dbo.TblFileDetail");
            DropTable("dbo.TblGroupType");
        }
    }
}
