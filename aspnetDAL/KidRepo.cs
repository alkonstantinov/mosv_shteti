using aspnetBO.Kid;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace aspnetDAL
{
    public class KidRepo : BaseRepo, IKidRepo
    {
        public KidRepo(IConfiguration configuration, string cs = "DBInfo:ConnectionString") : base(configuration, cs)
        {

        }
        public KidRepo(string cs) : base(cs)
        {

        }
        public List<Kid> KIDGetAll()
        {
            return dbConnection.Query<Kid>("KIDGetAll", commandType: CommandType.StoredProcedure).AsList();
        }
        //public int KIDInsert(Kid kid)
        //{
        //    return dbConnection.ExecuteScalar<int>("KIDInsert", param: new
        //    {
        //        _kidvalue = kid.KIDValue,
        //        _kidlabelbg = kid.KIDLabelBg,
        //        _kidselectable = kid.KIDSelectable
        //    }, commandType: CommandType.StoredProcedure);
        //}
    }
}
