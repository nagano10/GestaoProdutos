using Application.DTOs;
using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("produto")]
    public class ProdutoController : ControllerBase
    {
        private readonly ProdutoService _service;

        public ProdutoController(ProdutoService service)
        {
            _service = service;
        }

        /// <summary>
        /// Lista todos os produtos
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var itens = await _service.ListarAsync();
            return Ok(itens);
        }

        /// <summary>
        /// Cria um novo produto
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ProdutoCreateDto dto)
        {
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            var criado = await _service.CriarAsync(dto);
            return Created($"/produto/{criado.Id}", criado);
        }
    }
}