import { Entry, NewEntry, NewPatientEntry, PatientEntry } from "../types";
import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { assertNever } from "../../utils/assertNever";

const id: string = uuidv4();

function getPatientEntries(): PatientEntry[] {
  const allPatients = patients.map(({ id, name, dateOfBirth, gender, occupation, entries, ssn }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
    ssn
  }));

  console.log(patients);
  return allPatients;
}

function getSinglePatient(patientId: string): PatientEntry[] {
  const findPatient = patients.filter(patient => patient.id === patientId);

  return findPatient;
}

function addNewPatientEntry(entry: NewPatientEntry): PatientEntry {
  const newPatientEntry = {
    id,
    ...entry
  };

  patients.push(newPatientEntry);

  return newPatientEntry;
}

function addNewEntry(entry: NewEntry, patientId: string): Entry {
  const findPatient = patients.filter(patient => patient.id === patientId);
  const healthCheckEntry = {
    ...entry,
    id: uuidv4()
  };

  switch (entry.type) {
    case 'HealthCheck':
      findPatient[0].entries.push(healthCheckEntry);

      return healthCheckEntry;
    case 'Hospital':
      findPatient[0].entries.push(healthCheckEntry);

      return healthCheckEntry;
    case 'OccupationalHealthcare':
      findPatient[0].entries.push(healthCheckEntry);

      return healthCheckEntry;
    default:
      return assertNever(entry);
  }
}

export default {
  getPatientEntries,
  addNewPatientEntry,
  getSinglePatient,
  addNewEntry
};