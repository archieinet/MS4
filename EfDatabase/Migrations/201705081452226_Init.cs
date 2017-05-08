namespace EfDatabase.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Init : DbMigration
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
                        Password = c.String(),
                        Email = c.String(),
                        Type = c.Int(nullable: false),
                        Active = c.Boolean(nullable: false),
                        UpdateDate = c.DateTime(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TblFileUpload", "UploadId", "dbo.TblFileDetail");
            DropIndex("dbo.TblFileUpload", new[] { "UploadId" });
            DropTable("dbo.TblUser");
            DropTable("dbo.TblFileUpload");
            DropTable("dbo.TblFileDetail");
        }
    }
}
