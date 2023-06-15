export function convertToCelsius(temp) {
  const celsius = Math.round(temp - 273.15);
  return celsius;
}