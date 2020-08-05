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
    public class GarmentsRepo
    {
        string connectionString;
        public GarmentsRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("CostumeKit");
        }

        public IEnumerable<Garment> GetGarmentsByOutfitId(int outfitId)
        {
            var sql = @"
                        select g.*
						from Garments g
							join OutfitGarments og
								on g.Id = og.GarmentId
						where OutfitId = @OutfitId
                        ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { OutfitId = outfitId };
                var result = db.Query<Garment>(sql, parameters);
                return result;
            }
        }

        public IEnumerable<Garment> GetGarments()
        {
            var sql = @"
                        select *
						from Garments
                        ";

            using (var db = new SqlConnection(connectionString))
            {
                var result = db.Query<Garment>(sql);
                return result;
            }
        }

        public Garment GetGarmentById(int garmentId)
        {
            var sql = @"
                        select *
                        from Garments
                        where Id = @GarmentId;
                        ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { GarmentId = garmentId };
                var result = db.QueryFirstOrDefault<Garment>(sql, parameters);
                return result;
            }
        }

        public OutfitGarment CheckForExistentOutfitGarment(int garmentId, int outfitId)
        {
            var sql = @"select *
                        from OutfitGarments
                        where GarmentId = @GarmentId and OutfitId = @OutfitId";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { GarmentId = garmentId, OutfitId = outfitId };
                var results = db.QueryFirstOrDefault<OutfitGarment>(sql, parameters);
                return results;
            }
        }

        public OutfitGarment AddOutfitGarment(int garmentId, int outfitId)
        {
            var sql = @"INSERT INTO OutfitGarments (GarmentId, OutfitId)
                     output inserted.*
                     VALUES(@GarmentId, @OutfitId);";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { GarmentId = garmentId, OutfitId = outfitId };
                var results = db.QueryFirstOrDefault<OutfitGarment>(sql, parameters);
                return results;
            }
        }

        public void DeleteOutfitGarment(int garmentId, int outfitId)
        {
            var sql = @"delete from OutfitGarments
                        where GarmentId = @GarmentId and OutfitId = @OutfitId";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { GarmentId = garmentId, OutfitId = outfitId };
                db.Execute(sql, parameters);
            }
        }
    }
}
