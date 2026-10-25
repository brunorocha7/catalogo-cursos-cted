using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoodleController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        public MoodleController(IConfiguration configuration, HttpClient httpClient)
        {
            _configuration = configuration;
            _httpClient = httpClient;
        }

        // GET: api/moodle/cursos
        [HttpGet("cursos")]
        public async Task<IActionResult> GetCursosDoMoodle()
        {
            var baseUrl = _configuration["MoodleSettings:BaseUrl"];
            var token = _configuration["MoodleSettings:Token"];

            // Validação simples para garantir que o token foi preenchido
            if (string.IsNullOrEmpty(token) || token == "SEU_TOKEN_GERADO_NO_MOODLE")
            {
                return BadRequest(new { mensagem = "O token do Moodle não foi configurado corretamente no appsettings.json." });
            }

            // Monta a URL exigida pelos Web Services do Moodle (Protocolo REST)
            var url = $"{baseUrl}?wstoken={token}&wsfunction=core_course_get_courses&moodlewsrestformat=json";

            try
            {
                // Faz a requisição GET para o Moodle de forma assíncrona
                var response = await _httpClient.GetAsync(url);

                if (!response.IsSuccessStatusCode)
                {
                    return BadRequest(new { mensagem = "Erro ao comunicar com o servidor do Moodle." });
                }

                var jsonResponse = await response.Content.ReadAsStringAsync();
                
                // Retorna os dados em formato JSON diretamente para quem chamou a API
                return Content(jsonResponse, "application/json");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = "Erro interno ao conectar ao Moodle.", detalhe = ex.Message });
            }
        }
    }
}