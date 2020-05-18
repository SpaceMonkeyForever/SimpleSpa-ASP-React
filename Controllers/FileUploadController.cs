using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebInterface.Filters;
using WebInterface.Helpers;


namespace WebInterface.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FileUploadController : ControllerBase
    {
        private readonly ILogger<FileUploadController> _logger;

        public FileUploadController(ILogger<FileUploadController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        [Route("[action]")]
        // [ValidateAntiForgeryToken]
        [DisableFormValueModelBinding]
        [RequestSizeLimit(100000000)]
        public async Task<IActionResult> UploadStreamingFile()
        {
            // full path to file in temp location
            var filePath = Path.GetTempFileName();

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await Request.StreamFile(stream);
            }

            // process uploaded files
            // Don't rely on or trust the FileName property without validation.

            return Ok();
        }
    }
}
