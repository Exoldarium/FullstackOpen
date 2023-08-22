import { useParams } from "react-router-dom";
import { Patient } from "../types";

interface Props {
  patients: Patient[]
}


export default function SinglePatientPage({ patients }: Props) {
  const { id } = useParams();

  const findPatient = patients.filter(patient => patient.id === id)

  console.log(findPatient)
  return (
    <>
      <h1>{findPatient[0]?.name}</h1>
      <p>Gender: {findPatient[0]?.gender}</p>
      <p>Occupation: {findPatient[0]?.occupation}</p>
    </>
  )
}