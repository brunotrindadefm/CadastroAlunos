// Definição de um controlador no ASP.NET Core  

using Microsoft.AspNetCore.Mvc;
using backend.Context;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Controllers
{
    // Esse atributo informa ao ASP.NET Core que essa classe é um controlador de API
    [ApiController]

    // Define a rota padrão para as ações desse controlador
    [Route("api/[controller]")]

    // ControllerBase é uma classe base para criar APIs
    public class StudentsController : ControllerBase
    {
        // Contexto que acessa os dados
        private readonly ApplicationDbContext _context;

        // Construtor que injeta o contexto do banco de dados
        public StudentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetAllStudents()
        {
            return await _context.Students.ToListAsync();
        }

        [HttpGet("{studentId}")]
        public async Task<ActionResult<Student>> GetById(int studentId)
        {
            Student student = await _context.Students.FindAsync(studentId);

            if (student == null) return NotFound();

            return student;
        }

        [HttpPost]
        public async Task<ActionResult<Student>> CreateStudent(Student student)
        {
            await _context.Students.AddAsync(student);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> EditStudent(Student student)
        {
            _context.Students.Update(student);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{studentId}")]
        public async Task<ActionResult> DeleteStudent(int studentId)
        {
            Student student = await _context.Students.FindAsync(studentId);
            if (student == null) return NotFound();

            _context.Remove(student);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}