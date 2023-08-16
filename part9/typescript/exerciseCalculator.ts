interface CalculateValues {
  value1: number[];
  value2: number;
}

interface DisplayValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function checkArguments(args: string[]): CalculateValues {
  if (args.length < 4) throw new Error('Too few arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  // convert the string to a numbers array
  const numbersArray = args[2].match(/\d+\.?\d*/g).map(Number);
  if (numbersArray.length < 7) throw new Error('Include number for each day of the week, use 0 if no exercise');

  for (const number of numbersArray) {
    if (isNaN(Number(number))) throw new Error('values should be numbers');
  }

  if (!isNaN(Number(args[3]))) {
    return {
      value1: numbersArray,
      value2: Number(args[3])
    }
  } else {
    throw new Error('values should be numbers');
  }
}

function calculateExercises(data: number[], target: number): DisplayValues {
  const sum = data.reduce((tally, currentValue) => tally + currentValue);
  const average = sum / 7;

  const trainingDays = data.find(day => {
    let count = 0;

    if (day !== 0) {
      count += 1;
    }

    return count;
  });

  const dataToPrint = {
    periodLength: 7,
    trainingDays,
    success: average > target ? true : false,
    rating: average > target ? 3 : 1,
    ratingDescription: average > target ? 'Good job!' : 'Almost there',
    target,
    average
  }

  return dataToPrint;
}

try {
  const { value1, value2 } = checkArguments(process.argv);
  console.log(calculateExercises(value1, value2));
} catch (error) {
  let errorMessage = 'There was an error';
  if (error instanceof Error) {
    errorMessage += 'Error' + errorMessage;
  }
  console.log(error.message);
}