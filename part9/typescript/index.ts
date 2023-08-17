import express from "express";
import { calculateBmi, parseArguments } from "./bmiCalculator";
// import { calculateBmi } from "./bmiCalculator";
const app = express();

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
    let errorMessage = 'There was an error';
    if (error instanceof Error) {
      errorMessage += 'Error' + error.message;
    }
    console.log(error.message);
    res.status(500).json({
      error: "malformatted parameters"
    });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}`);
});