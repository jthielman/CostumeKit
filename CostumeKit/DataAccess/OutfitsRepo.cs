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
    public class OutfitsRepo
    {
        string connectionString;
        public OutfitsRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("CostumeKit");
        }

        public IEnumerable<Outfit> GetUserOutfits(int userId)
        {
            var sql = @"
                        select o.*, s.[Name] SettingName 
	                    from Outfits o
	                        join Settings s
	                            on o.SettingId = s.Id
                        where UserId = @UserId;
                        ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId };
                var result = db.Query<Outfit>(sql, parameters);
                return result;
            }
        }
    }
}
