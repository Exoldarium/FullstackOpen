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
  if (args.length < 10) throw new Error('Too few arguments');
  if (args.length > 10) throw new Error('Too many arguments');

  const value1 = [];

  for (let i = 2; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      // loop through the args and push converted numbers to array
      value1.push(Number(args[i]));
    } else {
      throw new Error('values should be numbers');
    }
  }

  // get the last value from the array
  const value2 = Number(value1.pop());

  return {
    value1,
    value2
  };
}

function calculateExercises(data: number[], target: number): DisplayValues {
  // get the average amount of exercise
  const sum = data.reduce((tally, currentValue) => tally + currentValue);
  const average = sum / 7;

  // filter out the days where there was no exercise
  const trainingDays = data.filter(day => day !== 0);

  const dataToPrint = {
    periodLength: 7,
    trainingDays: trainingDays.length,
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

checkArguments(process.argv);