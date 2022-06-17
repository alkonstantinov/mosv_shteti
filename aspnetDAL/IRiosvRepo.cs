using aspnetBO.Riosv;
using System.Collections.Generic;

namespace aspnetDAL
{
    public interface IRiosvRepo
    {
        List<Riosv> RIOSVGetAll();
    }
}