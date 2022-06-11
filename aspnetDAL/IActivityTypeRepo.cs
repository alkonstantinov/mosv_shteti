using aspnetBO.ActivityType;
using System.Collections.Generic;

namespace aspnetDAL
{
    public interface IActivityTypeRepo
    {
        List<ActivityType> ActivitiesGetAll();
    }
}