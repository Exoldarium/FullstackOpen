import express from 'express';
import cors from 'cors';
import { PORT } from '../utils/config';

import diagnosesRouter from './routes/diagnosesRoutes';
import patientsRouter from './routes/patientRoutes';

const app = express();

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/43909#issuecomment-1168194740
app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

