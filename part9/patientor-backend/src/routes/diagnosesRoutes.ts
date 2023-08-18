import express from 'express';
import diagnosesServices from '../services/diagnosesServices';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosesServices.getDiagnosesEntries());
});

router.post('/', (_req, res) => {
  res.send("Create a new diagnose");
});

export default router;