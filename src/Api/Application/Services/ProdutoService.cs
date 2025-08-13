using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;

namespace Application.Services
{
    public class ProdutoService
    {
        private readonly IProdutoRepository _repository;

        public ProdutoService(IProdutoRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Produto>> ListarAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Produto> CriarAsync(ProdutoCreateDto dto)
        {
            var produto = new Produto
            {
                Nome = dto.Nome.Trim(),
                Preco = dto.Preco,
                Categoria = dto.Categoria.Trim()
            };

            return await _repository.AddAsync(produto);
        }
    }
}