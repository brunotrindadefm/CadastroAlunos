using backend.Validation;

namespace backend.Models
{
    public class Student
    {
        public int StudentId { get; set; }

        [NameValidation(2, 50, "Nome")]
        public string Name { get; set; }

        [NameValidation(2, 50, "Sobrenome")]
        public string LastName { get; set; }

        [DateValidation("01/01/1910")]
        public DateTime DateOfBirth { get; set; }

        [GradeValidation(0.1, 30.0, "Prova 1")]
        public decimal Grade1 { get; set; }

        [GradeValidation(0.1, 30.0, "Prova 2")]
        public decimal Grade2 { get; set; }

        [GradeValidation(0.1, 20.0, "Institucional")]
        public decimal InstitutionalGrade { get; set; }

        [GradeValidation(0.1, 20.0, "Atividade")]
        public decimal Activities { get; set; }

        public decimal TotalGrade => Grade1 + Grade2 + InstitutionalGrade + Activities;

    }
}