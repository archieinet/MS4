namespace EfDatabase.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ValidateAcct : DbMigration
    {
        public override void Up()
        {

            Sql(@"CREATE PROCEDURE dbo.usp_ValidateAcct
                    @usr varchar(100),
                    @email varchar(50),
                    @pwd varchar(50),
                    @ident varchar(max) output 
                AS	 
                BEGIN 
                     SET NOCOUNT ON;
                        IF  0 < (SELECT COUNT(*) 
					                FROM [MS4DB].[DBO].[TBLUSER]
						                WHERE (USERNAME = @usr OR EMAIL = @email)
						                AND PASSWORD = @pwd AND Active = 1)
			                 SELECT @ident = CONCAT(NEWID(),CONCAT('-', CONVERT(VARCHAR(10), GETDATE(), 112)))
		                ELSE
			                SELECT  @ident = 'NOTFOUND'
	                SET NOCOUNT OFF;
                END");
        }
        
        public override void Down()
        {
            DropStoredProcedure("dbo.usp_ValidateAcct");
        }
    }
}
