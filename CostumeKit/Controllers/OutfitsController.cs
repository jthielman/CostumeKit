using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CostumeKit.DataAccess;
using CostumeKit.Models;
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

        //api/Outfits/1
        [HttpGet("{outfitId}")]
        public IActionResult GetOutfitByOutfitId(int outfitId)
        {
            var outfit = _outfitsRepository.GetOutfitById(outfitId);
            if (outfit == null) return NotFound("No such outfit found");
            else return Ok(outfit);
        }

        //api/Outfits/Add
        [HttpPost("Add")]
        public IActionResult AddOutfit(Outfit outfitToAdd)
        {
            var newOutfit = _outfitsRepository.AddAnOutfit(outfitToAdd);
            return Created("", newOutfit);
        }

        //api/Outfits/Update
        [HttpPut("Update")]
        public IActionResult UpdateOutfit(Outfit outfitToUpdate)
        {
            var isValidOutfit = _outfitsRepository.GetOutfitById(outfitToUpdate.Id);
            if (isValidOutfit != null)
            {
                var updatedOutfit = _outfitsRepository.Update(outfitToUpdate);
                return Ok(updatedOutfit);
            }
            return NotFound("That outfit does not exist and could not be deleted");
        }
    }
}
