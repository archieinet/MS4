using EfDatabase;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Models;
using System.Diagnostics;

namespace UnitTestProj
{

    [TestClass]
    public class UnitTest1
    {
        readonly MS4DbContext msdb;

        public UnitTest1()
        {
            msdb = new MS4DbContext();
        }


        [TestMethod]
        public void TestMethod1()
        {
            Models.Profile op =  msdb.ValidateLogin(new User {
                UserName = "archieinet", Email = "archie@ctrwater.net", Password = "123456" });
          
            Assert.AreEqual("NOTFOUND", op.KeyID);
            
        }
    }
}
