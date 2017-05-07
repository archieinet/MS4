﻿using System.Data.Entity;

namespace EfDatabase
{
    class BaseContext<T>: DbContext where T: DbContext
    {
        static BaseContext()
        {
            Database.SetInitializer<T>(null);
        }

       protected BaseContext() : base("MS4Db") { }
    }
}
