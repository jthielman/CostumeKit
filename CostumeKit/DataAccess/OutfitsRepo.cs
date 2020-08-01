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

        public Outfit GetOutfitById(int outfitId)
        {
            var sql = @"
                        select o.*, s.[Name] SettingName
                        from Outfits o
                            join Settings s
                                on o.settingId = s.Id
                        where o.Id = @OutfitId;
                        ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { OutfitId = outfitId };
                var result = db.QueryFirstOrDefault<Outfit>(sql, parameters);
                return result;
            }
        }

        public Outfit AddAnOutfit(Outfit outfitToAdd)
        {
            var sql = @"INSERT INTO Outfits ( Name, Description, UserId, SettingId)
                     output inserted.*
                     VALUES(@Name, @Description,@UserId, @SettingId);";

            using (var db = new SqlConnection(connectionString))
            {
                var results = db.QueryFirstOrDefault<Outfit>(sql, outfitToAdd);
                var newOutfit = GetOutfitById(results.Id);
                return newOutfit;
            }
        }

        public Outfit Update(Outfit outfitToUpdate)
        {
            var sql = @"
                        update Outfits
                        set [Name] = @Name, [Description] = @Description, [UserId] = @UserId, [SettingId] = @SettingId
                        where Id = @Id;
                      ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new
                {
                    Id = outfitToUpdate.Id,
                    Name = outfitToUpdate.Name,
                    Description = outfitToUpdate.Description,
                    UserId = outfitToUpdate.UserId,
                    SettingId = outfitToUpdate.SettingId
                };
                var result = db.QueryFirstOrDefault<Outfit>(sql, parameters);
                return result;

            }
        }
    }
}
