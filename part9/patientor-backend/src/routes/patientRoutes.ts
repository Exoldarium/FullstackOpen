import express from 'express';
import patientServices from '../services/patientServices';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientServices.getPatientEntries());
});

export default router;