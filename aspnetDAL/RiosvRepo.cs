using aspnetBO.Riosv;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace aspnetDAL
{
    public class RiosvRepo : BaseRepo, IRiosvRepo
    {
        public RiosvRepo(IConfiguration configuration, string cs = "DBInfo:ConnectionString") : base(configuration, cs)
        {

        }
        public RiosvRepo(string cs) : base(cs)
        {

        }

        public List<Riosv> RIOSVGetAll()
        {
            return dbConnection.Query<Riosv>("RIOSVGetAll", commandType: CommandType.StoredProcedure).AsList();
        }
    }
}
