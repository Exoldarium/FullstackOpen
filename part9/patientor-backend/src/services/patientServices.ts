import { NewPatientEntry, PatientEntry } from "../types";
import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

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

export default {
  getPatientEntries,
  addNewPatientEntry,
  getSinglePatient
};