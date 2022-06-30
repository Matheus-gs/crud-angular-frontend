import { AbstractControl, ValidatorFn } from "@angular/forms";

export function ageOverEighteen(date: string) {
  const currentDateYear = new Date().getFullYear();
  const birthYear = new Date(date).getFullYear();
  return currentDateYear - birthYear >= 18 ? true : false;
}

export function ageValidator(): ValidatorFn {
  function calculateAge(birthday) {
    let ageDifMs = Date.now() - birthday;
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }

    // Quantidade de caracteres numa data
    if (control.value.length > 10) {
      return { minAge: true };
    }

    // Pegando a string que ta na key e gerando um valor do tipo date
    let birthday = new Date(control.value);

    // Chamando a função de calcular idade passando a data que o usuário digitou
    const response = calculateAge(birthday);

    if (response >= 18) {
      return null;
    }

    return { minAge: true };
  };
}
