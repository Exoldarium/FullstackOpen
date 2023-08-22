import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from "../types";
import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

const id: string = uuidv4();

function getPatientEntries(): NonSensitivePatientEntry[] {
  const allPatients = patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));

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

export default {
  getPatientEntries,
  addNewPatientEntry,
  getSinglePatient
};