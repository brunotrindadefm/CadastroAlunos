using Microsoft.EntityFrameworkCore;
using backend.Models;

// Definindo a classe que representa o contexto de banco de dados da minha aplicação

namespace backend.Context
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Student> Students { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
    }
}