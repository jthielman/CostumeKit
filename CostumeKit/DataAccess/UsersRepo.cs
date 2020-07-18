using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CostumeKit.Models;
using System.Data.SqlClient;
using Dapper;

namespace CostumeKit.DataAccess
{
    public class UsersRepo
    {
        string connectionString;
        public UsersRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("CostumeKit");
        }

        public User GetUserById(int userId)
        {
            var sql = @"select * 
                        from [Users]
                        where Id = @UserId
                        and UserName is not null;";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId };
                var user = db.QueryFirstOrDefault<User>(sql, parameters);
                return user;
            }
        }
    }
}
