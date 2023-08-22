import { DiagnoseEntry } from "../types";
import diagnoses from '../../data/diagnoses';

function getDiagnosesEntries(): DiagnoseEntry[] {
  return diagnoses;
}

// function getSingleDiagnoseEntry(code: string): DiagnoseEntry[] {
//   const findDiagnose = diagnoses.filter(diagnoses => diagnoses.code === code);

//   return findDiagnose;
// }

export default {
  getDiagnosesEntries
};