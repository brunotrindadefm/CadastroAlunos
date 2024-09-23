using System;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace backend.Validation
{
    public class NameValidation : ValidationAttribute
    {
        private readonly int _min;
        private readonly int _max;
        private readonly string strType;

        public NameValidation(int minLength, int maxLength, string nameOrLastName)
        {
            _min = minLength;
            _max = maxLength;
            strType = nameOrLastName;

            ErrorMessage = $"O {strType} deve ter entre {_min} e {_max} carácteres!";
        }

        protected override ValidationResult? IsValid(object value, ValidationContext validationContext)
        {
            if (value is string str)
            {
                if (string.IsNullOrWhiteSpace(str))
                {
                    return new ValidationResult($"{strType} inválido!");
                }
                if (str.Length < _min || str.Length > _max )
                {
                    return new ValidationResult(ErrorMessage);
                }
                if (str.Contains(" "))
                {
                    return new ValidationResult($"{strType} não deve ter espaço!");
                }
                if (!Regex.IsMatch(str, @"^[a-zA-Z\s]+$"))
                {
                    return new ValidationResult($"{strType} deve conter apenas letras!");
                }
            }
            else
            {
                return new ValidationResult($"{strType} inválido");
            }

            return ValidationResult.Success;
        }
    }
}