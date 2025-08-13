using Domain.Entities;

namespace Application.Interfaces
{
    public interface IProdutoRepository
    {
        Task<IEnumerable<Produto>> GetAllAsync();
        Task<Produto> AddAsync(Produto produto);
    }
}