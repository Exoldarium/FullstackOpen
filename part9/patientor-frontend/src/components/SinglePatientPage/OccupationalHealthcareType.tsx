import { Diagnosis, Entry } from "../../types";
import WorkIcon from '@mui/icons-material/Work';

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

export default function OccupationalHealthcareType({ entry, diagnoses }: Props) {
  return (
    <div>
      <WorkIcon />
      {entry.diagnosisCodes?.map((code, i) => {
        const findDiagnose = diagnoses?.filter(diagnose => diagnose.code === code);

        return <ul key={i}>
          <li>{code}{findDiagnose[0]?.name}</li>
        </ul>
      })}
    </div>
  )
}