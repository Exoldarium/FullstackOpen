import express from 'express';
import patientServices from '../services/patientServices';
import toNewPatientEntry from '../../utils/parsePatientData';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).send(patientServices.getPatientEntries());
});

router.post('/', (req, res) => {
  try {
    console.log(req.body);
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientServices.addNewPatientEntry(newPatientEntry);

    res.status(201).json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }

    res.status(400).send(errorMessage);
  }
});

export default router;