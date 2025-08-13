using System.ComponentModel.DataAnnotations;

namespace Application.DTOs
{
    public class ProdutoCreateDto
    {
        [Required, StringLength(100)]
        public string Nome { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue, ErrorMessage = "O preço deve ser maior que zero.")]
        public decimal Preco { get; set; }

        [Required, StringLength(50)]
        public string Categoria { get; set; } = string.Empty;
    }
}