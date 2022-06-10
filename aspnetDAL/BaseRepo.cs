using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Data;

namespace aspnetDAL
{
    public class BaseRepo
    {
        internal string connectionString;
        internal IDbConnection dbConnection;
        public BaseRepo(IConfiguration configuration, string cs = "DBInfo:ConnectionString")
        {
            connectionString = configuration[cs];

            dbConnection = new NpgsqlConnection(connectionString);


        }

        public BaseRepo(string cs)
        {

            dbConnection = new NpgsqlConnection(cs);


        }

    }
}
