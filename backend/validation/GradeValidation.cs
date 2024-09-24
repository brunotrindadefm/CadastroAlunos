using System.ComponentModel.DataAnnotations;

namespace backend.Validation
{
    // classe ValidationAttribute cria validações personalizadas para propriedades
    public class GradeValidation : ValidationAttribute
    {
        // Declaração de variáveis privadas que armazenam os limites mínimo e máximo permitidos para a nota.
        private readonly decimal gradeMin;
        private readonly decimal gradeMax;

        // O construtor recebe os valores min e max como parâmetros para definir os limites de validação
        public GradeValidation(double min, double max, string gradeName)
        {
            gradeMin = (decimal)min;
            gradeMax = (decimal)max;

            ErrorMessage = $"Nota da {gradeName} inválida!";
        }

        // O método IsValid é sobrescrito da classe base ValidationAttribute e contém a lógica de validação
        // value representa o valor da propriedade que está sendo validada
        // validationContext fornece informações adicionais sobre o contexto de validação
        protected override ValidationResult? IsValid(object value, ValidationContext validationContext)
        {
            if (value is decimal grade)
            {
                if (grade < gradeMin || grade > gradeMax)
                {
                    return new ValidationResult(ErrorMessage);
                }
            }
            else
            {
                return new ValidationResult("A nota deve ser um número!");
            }

            return ValidationResult.Success;
        }
    }
}