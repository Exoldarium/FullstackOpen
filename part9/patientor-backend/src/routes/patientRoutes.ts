import express from 'express';
import patientServices from '../services/patientServices';
import toNewPatientEntry from '../../utils/parsePatientData';
import toNewEntry from '../../utils/parseEntryData';

const router = express.Router();

router.get('/', (_req, res) => {
  const allPatients = patientServices.getPatientEntries();
  res.status(200).send(allPatients);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const onePatient = patientServices.getSinglePatient(id);

  res.status(200).send(onePatient);
});

router.post('/', (req, res) => {
  try {
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

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientServices.addNewEntry(newEntry, id);

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