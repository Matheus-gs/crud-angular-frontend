export function ageOverEighteen(date: string) {
  const currentDateYear = new Date().getFullYear();
  const birthYear = new Date(date).getFullYear();
  return currentDateYear - birthYear >= 18 ? true : false;
}
