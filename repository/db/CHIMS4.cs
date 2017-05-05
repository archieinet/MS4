using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace repository.db
{
    public class CHIMS4 : DbContext
    {
        public CHIMS4() : base("CHIMS4")
        {}


    }
}
