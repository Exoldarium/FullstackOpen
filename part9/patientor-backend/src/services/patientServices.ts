import { NonSensitivePatientEntry } from "../types";
import patients from '../../data/patients';

function getPatientEntries(): NonSensitivePatientEntry[] {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
}

export default {
  getPatientEntries
};