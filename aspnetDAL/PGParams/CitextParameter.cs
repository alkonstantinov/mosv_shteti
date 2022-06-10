using Dapper;
using Npgsql;
using NpgsqlTypes;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace baioffice.server.dal.PGParams
{
    public class CitextParameter : SqlMapper.ICustomQueryParameter
    {
        readonly object _value;

        public CitextParameter(string value)
        {
            _value = value;
        }



        public void AddParameter(IDbCommand command, string name)
        {
            command.Parameters.Add(new NpgsqlParameter
            {
                ParameterName = name,
                NpgsqlDbType = NpgsqlDbType.Citext,
                Value = _value == null ? System.DBNull.Value : _value
            });
        }
    }
}
