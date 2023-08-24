import { useState } from "react";
import HealthCheckForm from "./HealthCheckForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import HospitalForm from "./HospitalForm";

interface Props {
  setNewEntryActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddNewEntry({ setNewEntryActive }: Props) {
  const entryTypes: string[] = ['HealthCheck', 'OccupationalHealthcare', 'Hospital'];
  const [selectedOption, setSelectedOption] = useState('HealthCheck');

  console.log(entryTypes);

  return (
    <div>
      <label htmlFor="entry-select">Choose entry type: </label>
      <select
        name="entry-select"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedOption(e.target.value)}
      >
        {entryTypes.map((entry, i) => (
          <option key={i}>{entry}</option>
        ))}
      </select>
      <h2>{selectedOption} entry</h2>
      {selectedOption === 'HealthCheck' && <HealthCheckForm setNewEntryActive={setNewEntryActive} />}
      {selectedOption === 'OccupationalHealthcare' && <OccupationalHealthcareForm setNewEntryActive={setNewEntryActive} />}
      {selectedOption === 'Hospital' && <HospitalForm setNewEntryActive={setNewEntryActive} />}
    </div>
  )
}