using aspnetBO.ActivityType;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace aspnetDAL
{
    public class ActivityTypeRepo : BaseRepo, IActivityTypeRepo
    {
        public ActivityTypeRepo(IConfiguration configuration, string cs = "DBInfo:ConnectionString") : base(configuration, cs)
        {

        }
        public ActivityTypeRepo(string cs) : base(cs)
        {

        }

        public List<ActivityType> ActivitiesGetAll()
        {
            return dbConnection.Query<ActivityType>("ActivitiesGetAll", commandType: CommandType.StoredProcedure).AsList();
        }
    }
}
