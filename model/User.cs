using System;


namespace model
{
    public class User
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public string Pwd { get; set; }
        public string Email { get; set; }
        public UserType Type { get; set; }
        public bool Active { get; set; }
        public DateTime UpdateDate { get; set; }
        public DateTime CreateDate { get; set; }

    }
}

