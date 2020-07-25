using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CostumeKit.DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CostumeKit.Controllers
{
    [Route("api/Settings")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        SettingsRepo _settingsRepository;

        public SettingsController(SettingsRepo settingsRepository)
        {
            _settingsRepository = settingsRepository;
        }

        //api/settings
        [HttpGet]
        public IActionResult GetAllSettings()
        {
            var allSettings = _settingsRepository.GetSettings();
            if (allSettings == null) return NotFound("No settings found");

            return Ok(allSettings);
        }
    }
}
