using aspnetBO.MainTable;
using baioffice.server.dal.PGParams;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace aspnetDAL
{
    public class MainRepo : BaseRepo, IMainRepo
    {
        public MainRepo(IConfiguration configuration, string cs = "DBInfo:ConnectionString") : base(configuration, cs)
        {

        }
        public MainRepo(string cs) : base(cs)
        {

        }

        public List<MainTable> MainTableGetAll(int startIndex, int count, bool isDeleted)
        {
            return dbConnection.Query<MainTable>("MainTableGetAll", param: new
            {
                _startindex = startIndex,
                _count = count,
                _isdeleted = isDeleted
            }, commandType: CommandType.StoredProcedure).AsList();
        }

        public List<MainTable> DamageGetAll(int startIndex, int count)
        {
            return dbConnection.Query<MainTable>("DamageGetAll", param: new
            {
                _startindex = startIndex,
                _count = count,
                _isdeleted = false
            }, commandType: CommandType.StoredProcedure).AsList();
        }
        public List<MainTable> MenaceGetAll(int startIndex, int count)
        {
            return dbConnection.Query<MainTable>("MenaceGetAll", param: new
            {
                _startindex = startIndex,
                _count = count,
                _isdeleted = false
            }, commandType: CommandType.StoredProcedure).AsList();
        }

        public int GetRecordsCount(bool isDamage)
        {
            return dbConnection.ExecuteScalar<int>("GetRecordsCount", new
            {
                _isdamage = isDamage,
            }, commandType: CommandType.StoredProcedure);
        }

        public MainTable MainTableGetById(int mainTableId)
        {
            return dbConnection.QueryFirstOrDefault("MainTableGetById", param: new
            {
                _maintableid = mainTableId,
            }, commandType: CommandType.StoredProcedure);
        }

        public int MainTableInsert(MainTable mt)
        {
            return dbConnection.ExecuteScalar<int>("MainTableInsert", param: new
            {
                _isdamage = mt.isDamage,
                _damagelist = new JsonParameter(mt.DamageList.ToString()),
                _appearancedate = mt.AppearanceDate.Date,
                _proceduredate = mt.ProcedureDate.Date,
                _activitytypeid = mt.ActivityTypeId,
                _applicant = mt.Applicant,
                _kidid = mt.KidId,
                _courtcases = new JsonParameter(mt.CourtCases.ToString()),
                _preventresultslist = new JsonParameter(mt.PreventResultsList.ToString()),
                _removalresultslist = new JsonParameter(mt.RemovalResultsList.ToString()),
                _enddate = mt.EndDate.Date,
                _paidcosts = mt.PaidCosts,
                _reimbursedcosts = mt.ReimbursedCosts,
                _unpaidcosts = mt.UnpaidCosts,
                _paymentsourceoperator = mt.PaymentSourceOperator,
                _paymentsource = mt.PaymentSource,
                _financialassurance = new JsonParameter(mt.FinancialAssurance.ToString()),
                _administativecosts = mt.AdministativeCosts,
                _other = mt.Other
            }, commandType: CommandType.StoredProcedure);
        }

        public void MainTableUpdate(MainTable mt)
        {
            dbConnection.ExecuteScalar("MainTableUpdate", param: new
            {
                _maintableid = mt.MainTableId,
                _isdamage = mt.isDamage,
                _damagelist = new JsonParameter(mt.DamageList.ToString()),
                _appearancedate = mt.AppearanceDate,
                _proceduredate = mt.ProcedureDate,
                _activitytypeid = mt.ActivityTypeId,
                _applicant = mt.Applicant,
                _kidid = mt.KidId,
                _courtcases = new JsonParameter(mt.CourtCases.ToString()),
                _preventresultslist = new JsonParameter(mt.PreventResultsList.ToString()),
                _removalresultslist = new JsonParameter(mt.RemovalResultsList.ToString()),
                _enddate = mt.EndDate,
                _paidcosts = mt.PaidCosts,
                _reimbursedcosts = mt.ReimbursedCosts,
                _unpaidcosts = mt.UnpaidCosts,
                _paymentsourceoperator = mt.PaymentSourceOperator,
                _paymentsource = mt.PaymentSource,
                _financialassurance = new JsonParameter(mt.FinancialAssurance.ToString()),
                _administativecosts = mt.AdministativeCosts,
                _other = mt.Other,
                _isdeleted = mt.IsDeleted
            }, commandType: CommandType.StoredProcedure);
        }
    }
}
