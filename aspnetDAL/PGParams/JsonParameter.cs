using Npgsql;
using NpgsqlTypes;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using static Dapper.SqlMapper;

namespace baioffice.server.dal.PGParams
{
    public class JsonParameter : ICustomQueryParameter
    {
        private readonly string _value;

        public JsonParameter(string value)
        {
            _value = value;
        }

        public void AddParameter(IDbCommand command, string name)
        {
            var parameter = new NpgsqlParameter(name, NpgsqlDbType.Jsonb);
            parameter.Value =  _value;
            if (string.IsNullOrEmpty(_value))
                parameter.Value = System.DBNull.Value;
            command.Parameters.Add(parameter);
        }
    }
}
