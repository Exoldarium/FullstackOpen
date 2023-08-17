import express from 'express';
import { PORT } from './utils/config';
const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

