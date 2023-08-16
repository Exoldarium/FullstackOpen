// BMI = mass/height(squared)
// A BMI of 25.0 or more is overweight, while the healthy range is 18.5 to 24.9
interface DivideValues {
  value1: number;
  value2: number;
}

function parseArguments(args: string[]): DivideValues {
  if (args.length < 4) throw new Error('Too few arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[3]),
      value2: Number(args[2])
    }
  } else {
    throw new Error('Provided values must be numbers');
  }
}

function calculateBmi(weight: number, height: number): string {
  const total = weight / Math.pow(height / 100, 2);

  if (total < 18.5) {
    return 'Underweight';
  } else if (total > 24.9) {
    return 'Overweight';
  } else {
    return 'Normal (healthy weight)';
  }
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error) {
  let errorMessage = 'There was an error';
  if (error instanceof Error) {
    errorMessage += 'Error' + error.message;
  }
  console.log(error.message);
}