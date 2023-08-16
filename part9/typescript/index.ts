import express from "express";
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello world!');
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}`);
});