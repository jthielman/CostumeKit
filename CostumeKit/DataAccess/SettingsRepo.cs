using CostumeKit.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace CostumeKit.DataAccess
{
    public class SettingsRepo
    {
        string connectionString;
        public SettingsRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("CostumeKit");
        }

        public IEnumerable<Setting> GetSettings()
        {
            var sql = @"
                        select *
						from Settings
                        ";

            using (var db = new SqlConnection(connectionString))
            {
                var result = db.Query<Setting>(sql);
                return result;
            }
        }
    }
}
