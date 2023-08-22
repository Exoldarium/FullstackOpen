import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../types";

interface Props {
  patients: Patient[];
  diagnoses: Diagnosis[];
}

export default function SinglePatientPage({ patients, diagnoses }: Props) {
  const { id } = useParams();

  const findPatient = patients.filter(patient => patient.id === id)
  const patient = findPatient[0];

  console.log(patient, diagnoses);
  return (
    <>
      <h1>{patient?.name}</h1>
      <p>Gender: {patient?.gender}</p>
      <p>Occupation: {patient?.occupation}</p>
      <h2>entries</h2>
      <div>
        {patient?.entries.map(entry => (
          <div key={entry.id}>
            <p>{entry.date}</p>
            <p>{entry.description}</p>
            {entry.diagnosisCodes?.map((code, i) => {
              const findDiagnose = diagnoses?.filter(diagnose => diagnose.code === code);

              return <ul key={i}>
                <li>{code}{findDiagnose[0].name}</li>
              </ul>
            })}
          </div>
        ))}
      </div>
    </>
  )
}