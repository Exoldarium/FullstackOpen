/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
// BMI = mass/height(squared)
// A BMI of 25.0 or more is overweight, while the healthy range is 18.5 to 24.9
interface DivideValues {
  value1: number;
  value2: number;
}

export function parseArguments(args: any): DivideValues {
  if (args.length < 2) throw new Error('Too few arguments');
  if (args.length > 2) throw new Error('Too many arguments');

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      value1: Number(args[0]),
      value2: Number(args[1])
    };
  } else {
    throw new Error('Provided values must be numbers');
  }
}

export function calculateBmi(height: number, weight: number): string {
  const total = weight / Math.pow(height / 100, 2);

  if (total < 18.5) {
    return 'Underweight';
  } else if (total > 24.9) {
    return 'Overweight';
  } else {
    return 'Normal (healthy weight)';
  }
}