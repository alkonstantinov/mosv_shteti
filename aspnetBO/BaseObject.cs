using System;

namespace aspnetBO
{
    public class BaseObject
    {
        public bool IsDeleted { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ChangedOn { get; set; }
    }
}
