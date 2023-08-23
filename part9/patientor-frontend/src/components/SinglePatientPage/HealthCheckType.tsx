import { Diagnosis, Entry } from "../../types";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

export default function HealthCheckType({ entry, diagnoses }: Props) {
  return (
    <div>
      <HealthAndSafetyIcon />
      {entry.diagnosisCodes?.map((code, i) => {
        const findDiagnose = diagnoses?.filter(diagnose => diagnose.code === code);

        return <ul key={i}>
          <li>{code}{findDiagnose[0].name}</li>
        </ul>
      })}
    </div>
  )
}