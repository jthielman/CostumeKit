using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CostumeKit.Models
{
    public class Outfit
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public int SettingId { get; set; }
        public string SettingName { get; set; }
    }
}
