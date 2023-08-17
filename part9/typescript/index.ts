/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
import { calculateBmi, parseArguments } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello world!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  const args = [];
  args.push(height, weight);

  try {
    const { value1, value2 } = parseArguments(args);
    res.json({
      height: value1,
      weight: value2,
      bmi: calculateBmi(value1, value2)
    });
  } catch (error) {
    res.status(500).json({
      error: "malformatted parameters"
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  const value = [];

  if (!daily_exercises || !target || daily_exercises.length < 7) {
    res.status(404).json({
      error: "parameters missing"
    });
  }

  for (let i = 0; i < daily_exercises.length; i++) {
    if (!isNaN(Number(daily_exercises[i])) && !isNaN(Number(target))) {
      // loop through the args and push converted numbers to array
      value.push(Number(daily_exercises[i]));
    } else {
      res.status(500).json({
        error: "malformatted parameters"
      });
    }
  }

  try {
    const dataToPrint = calculateExercises(value, Number(target));

    res.status(201).send(dataToPrint);
  } catch (error) {
    console.log(error);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}`);
});