﻿using System;
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

        //api/Garments/9/Outfit/3
        [HttpPost("{garmentId}/outfits/{outfitId}")]
        public IActionResult AddGarmentToOutfit(int garmentId, int outfitId)
        {
            var validOutfit = _outfitsRepository.GetOutfitById(outfitId);
            var validGarment = _garmentsRepository.GetGarmentById(garmentId);
            var alreadyExists = _garmentsRepository.CheckForExistentOutfitGarment(garmentId, outfitId);
            if (validOutfit == null)
            {
                return NotFound("No such outfit found.");
            }
            else if (validGarment == null)
            {
                return NotFound("No such garment found.");
            }
            else if (alreadyExists != null)
            {
                return BadRequest("The garment is already in the outfit.");
            }
            else
            {
                var newOutfitGarment = _garmentsRepository.AddOutfitGarment(garmentId, outfitId);
                return Created("", newOutfitGarment);
            }
        }

        //api/Garments/9/Outfit/3
        [HttpDelete("{garmentId}/outfits/{outfitId}")]
        public IActionResult RemoveGarmentFromOutfit(int garmentId, int outfitId)
        {
            var validOutfit = _outfitsRepository.GetOutfitById(outfitId);
            var validGarment = _garmentsRepository.GetGarmentById(garmentId);
            var exists = _garmentsRepository.CheckForExistentOutfitGarment(garmentId, outfitId);
            if (validOutfit == null)
            {
                return NotFound("No such outfit found.");
            }
            else if (validGarment == null)
            {
                return NotFound("No such garment found.");
            }
            else if (exists == null)
            {
                return BadRequest("The garment is not even in the outfit.");
            }
            else
            {
                _garmentsRepository.DeleteOutfitGarment(garmentId, outfitId);
                return Ok("The garment has been removed from the outfit.");
            }
        }

        //api/Garments/Add
        [HttpPost("Add")]
        public IActionResult AddGarment(Garment garmentToAdd)
        {
            var newGarment = _garmentsRepository.AddAGarment(garmentToAdd);
            return Created("", newGarment);
        }
    }
}
