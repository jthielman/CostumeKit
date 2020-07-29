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
    }
}
