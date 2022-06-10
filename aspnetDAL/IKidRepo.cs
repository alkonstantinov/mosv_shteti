using aspnetBO.Kid;
using System.Collections.Generic;

namespace aspnetDAL
{
    public interface IKidRepo
    {
        List<Kid> KIDGetAll();
    }
}