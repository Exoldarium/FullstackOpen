import { PatientEntry } from "../src/types";
import toNewPatientEntry from "../utils/parsePatientData";

const data = [
  {
    "id": "d2773336-f723-11e9-8f0b-362b9e155667",
    "name": "John McClane",
    "dateOfBirth": "1986-07-09",
    "ssn": "090786-122X",
    "gender": "male",
    "occupation": "New york city cop"
  },
  {
    "id": "d2773598-f723-11e9-8f0b-362b9e155667",
    "name": "Martin Riggs",
    "dateOfBirth": "1979-01-30",
    "ssn": "300179-77A",
    "gender": "male",
    "occupation": "Cop"
  },
  {
    "id": "d27736ec-f723-11e9-8f0b-362b9e155667",
    "name": "Hans Gruber",
    "dateOfBirth": "1970-04-25",
    "ssn": "250470-555L",
    "gender": "other",
    "occupation": "Technician"
  },
  {
    "id": "d2773822-f723-11e9-8f0b-362b9e155667",
    "name": "Dana Scully",
    "dateOfBirth": "1974-01-05",
    "ssn": "050174-432N",
    "gender": "female",
    "occupation": "Forensic Pathologist"
  },
  {
    "id": "d2773c6e-f723-11e9-8f0b-362b9e155667",
    "name": "Matti Luukkainen",
    "dateOfBirth": "1971-04-09",
    "ssn": "090471-8890",
    "gender": "male",
    "occupation": "Digital evangelist"
  }
];

// we parse the json data so that we can access the fields correctly
// because we created an enum type for gender, typsecript will throw an error for that field
const patientData: PatientEntry[] = data.map(p => {
  const obj = toNewPatientEntry(p) as PatientEntry;
  obj.id = p.id;

  return obj;
});

export default patientData;