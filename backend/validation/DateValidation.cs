using System.ComponentModel.DataAnnotations;

namespace backend.Validation
{
    public class DateValidation : ValidationAttribute
    {
        private readonly DateTime _minDate;

        public DateValidation( string minDate)
        {
            _minDate = DateTime.Parse(minDate);

            ErrorMessage = "Data inválida!";
        }

        protected override ValidationResult? IsValid(object value, ValidationContext validationContext)
        {
            if (value is DateTime date) 
            {
                if (date < _minDate || date > DateTime.Now)
                {
                    return new ValidationResult(ErrorMessage);
                }
            } else 
            {
                return new ValidationResult(ErrorMessage);
            }
            return ValidationResult.Success;
        }
    }
}