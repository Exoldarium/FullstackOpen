import { Diagnosis, Entry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

export default function HospitalType({ entry, diagnoses }: Props) {
  console.log(entry, diagnoses)
  return (
    <div>
      <LocalHospitalIcon />
      {entry.diagnosisCodes?.map((code, i) => {
        const findDiagnose = diagnoses?.filter(diagnose => diagnose.code === code);

        return <ul key={i}>
          <li>{code}{findDiagnose[0]?.name}</li>
        </ul>
      })}
    </div>
  )
}