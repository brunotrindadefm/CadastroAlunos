namespace backend.Models
{
    public class Student
    {
            public int StudentId { get; set; }
            public string Name {get; set;}
            public string LastName {get; set;}
            public DateTime DateOfBirth {get; set;}
            public decimal Grade1 { get; set;}
            public decimal Grade2 { get; set;}
            public decimal InstitutionalGrade{ get; set;}
            public decimal Activities {get; set;}
            public decimal TotalGrade => Grade1 + Grade2 + InstitutionalGrade + Activities;

    }
}