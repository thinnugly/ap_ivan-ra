import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noSpecialCharsAndMinLength(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const hasNumbers = /\d/.test(value);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
    const isMinLength = control.value.length >= 2;

    // // Inicializa um objeto de erros
    // const errors: ValidationErrors = {};

    // // Verifica se tem números
    // if (hasNumbers) {
    //   errors['hasNumbers'] = true; // Adiciona erro para números
    // }

    // // Verifica se tem caracteres especiais
    // if (hasSpecialChars) {
    //   errors['hasSpecialChars'] = true; // Adiciona erro para caracteres especiais
    // }

    // // Verifica se a length é menor que 6
    // // if (!isMinLength) {
    // //   errors['minLength'] = true; // Adiciona erro para comprimento mínimo
    // // }

    // // Se houver erros, retorna o objeto de erros; caso contrário, retorna null
    // return Object.keys(errors).length ? errors : null;


    if (hasNumbers || hasSpecialChars || !isMinLength) {
        return { invalidName: true };
      }
  
      return null; // Valid
  };
}
