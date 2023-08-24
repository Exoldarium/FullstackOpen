import { useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Entry, Patient } from "../../types";
import HospitalType from "./HospitalType";
import OccupationalHealthcareType from "./OccupationalHealthcareType";
import HealthCheckType from "./HealthCheckType";
import { assertNever } from "../../utils";
import AddNewEntry from "../AddEntryForm";

interface Props {
  patients: Patient[];
  diagnoses: Diagnosis[];
}

function entryType(entry: Entry, diagnoses: Diagnosis[]) {
  switch (entry.type) {
    case "Hospital":
      return <HospitalType entry={entry} diagnoses={diagnoses} />
    case "OccupationalHealthcare":
      return <OccupationalHealthcareType entry={entry} diagnoses={diagnoses} />
    case "HealthCheck":
      return <HealthCheckType entry={entry} diagnoses={diagnoses} />
    default:
      return assertNever(entry);
  }
}

export default function SinglePatientPage({ patients, diagnoses }: Props) {
  const [newEntryActive, setNewEntryActive] = useState(false);
  const { id } = useParams();

  const findPatient = patients.filter(patient => patient.id === id)
  const patient = findPatient[0];

  // console.log(patient, diagnoses);
  return (
    <>
      <h1>{patient?.name}</h1>
      <p>Gender: {patient?.gender}</p>
      <p>Occupation: {patient?.occupation}</p>
      {newEntryActive && <AddNewEntry setNewEntryActive={setNewEntryActive} />}
      <h2>entries</h2>
      <div>
        {patient?.entries.map(entry => (
          <div key={entry.id} style={{
            border: '1px solid black',
            borderRadius: '5px',
            margin: '1rem',
            padding: '0.5rem'
          }}>
            <p>{entry.date}</p>
            <p>{entry.description}</p>
            {entryType(entry, diagnoses)}
            <p>diagnose by {entry.specialist}</p>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => setNewEntryActive(true)}>Add new entry</button>
    </>
  )
}