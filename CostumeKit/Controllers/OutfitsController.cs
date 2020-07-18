using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CostumeKit.DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CostumeKit.Controllers
{
    [Route("api/Outfits")]
    [ApiController]
    public class OutfitsController : ControllerBase
    {
        OutfitsRepo _outfitsRepository;
        UsersRepo _usersRepository;

        public OutfitsController(OutfitsRepo outfitsRepository, UsersRepo usersRepository)
        {
            _outfitsRepository = outfitsRepository;
            _usersRepository = usersRepository;
        }

        //api/Outfits/User/1
        [HttpGet("User/{userid}")]
        public IActionResult GetAllOutfitsByUserId(int userId)
        {
            var validUser = _usersRepository.GetUserById(userId);
            if (validUser == null)
            {
                return NotFound("No such user found.");
            }
            else
            {
                var outfits = _outfitsRepository.GetUserOutfits(userId);
                var isEmpty = !outfits.Any();
                if (isEmpty)
                {
                    return NotFound("User has no outfits");
                }
                return Ok(outfits);
            }
        }
    }
}
