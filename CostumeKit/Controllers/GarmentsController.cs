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
    [Route("api/Garments")]
    [ApiController]
    public class GarmentsController : ControllerBase
    {
        GarmentsRepo _garmentsRepository;
        OutfitsRepo _outfitsRepository;

        public GarmentsController(GarmentsRepo garmentsRepository, OutfitsRepo outfitsRepository)
        {
            _garmentsRepository = garmentsRepository;
            _outfitsRepository = outfitsRepository;
        }

        //api/Garments
        [HttpGet]
        public IActionResult GetAllGarments()
        {
            var allGarments = _garmentsRepository.GetGarments();
            if (allGarments == null) return NotFound("No garments found");

            return Ok(allGarments);
        }

        //api/Garments/Outfit/1
        [HttpGet("Outfit/{outfitId}")]
        public IActionResult GetAllGarmentsByOutfitId(int outfitId)
        {
            var validOutfit = _outfitsRepository.GetOutfitById(outfitId);
            if (validOutfit == null)
            {
                return NotFound("No such outfit found.");
            }
            else
            {
                var garments = _garmentsRepository.GetGarmentsByOutfitId(outfitId);
                if (!garments.Any()) return NotFound("No garments found");
                else return Ok(garments);
            }
        }
    }
}
