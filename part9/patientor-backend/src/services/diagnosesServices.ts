import { DiagnoseEntry } from "../types";
import diagnoses from '../../data/diagnoses';

function getDiagnosesEntries(): DiagnoseEntry[] {
  return diagnoses;
}

export default {
  getDiagnosesEntries
};