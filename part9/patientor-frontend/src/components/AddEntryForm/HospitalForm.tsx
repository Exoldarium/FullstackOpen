import { useParams } from "react-router";
import useForm from "../../hooks/useForm";
import { Patient } from "../../types";
import { parseToString } from "../../utils";
import patientService from '../../services/patients';
import { useState } from 'react';

interface Props {
  setNewEntryActive: React.Dispatch<React.SetStateAction<boolean>>;
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

export default function HospitalForm({ setNewEntryActive, patients, setPatients }: Props) {
  const [dischargeInput, setDischargeInput] = useState({
    dischargeDate: '',
    criteria: ''
  });
  const { id } = useParams();
  const { inputs, handleInputs } = useForm({
    description: '',
    date: '',
    specialist: '',
    discharge: {
      date: '',
      criteria: ''
    },
    type: 'Hospital',
    diagnosisCodes: []
  });

  function handleDischargeInput(e: React.ChangeEvent<HTMLInputElement>) {
    let { name, value } = e.target;

    setDischargeInput({
      ...dischargeInput,
      [name]: value
    })
  }

  async function addNewEntry(e: React.SyntheticEvent) {
    e.preventDefault();

    const string = inputs.diagnosisCodes?.toString();
    const arr = string?.split(' ');
    const newEntry = {
      ...inputs,
      diagnosisCodes: arr,
      discharge: {
        date: dischargeInput.dischargeDate,
        criteria: dischargeInput.criteria
      }
    }
    const parsedId = parseToString(id);

    const data = await patientService.addEntry(newEntry, parsedId);
    patients.filter(patient => patient.id === parsedId)[0].entries.concat(data);
    const newPatients = await patientService.getAll()
    setPatients(newPatients);
    setNewEntryActive(false);
  }

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '2px dotted black',
        padding: '0.5rem',
        margin: '0.5rem 0 0.5rem 0'
      }}
      onSubmit={addNewEntry}
    >
      <label htmlFor="description">Description</label>
      <input type="text" name="description" required onChange={handleInputs} />
      <label htmlFor="date">Date</label>
      <input type="date" name="date" required onChange={handleInputs} />
      <label htmlFor="specialist">Specialist</label>
      <input type="text" name="specialist" required onChange={handleInputs} />
      <label htmlFor="employer">Employer</label>
      <input type="text" name="employer" onChange={handleInputs} />
      <span style={{ display: 'flex', flexDirection: 'row' }}>
        Discharge data
        <label htmlFor="date">Discharge date</label>
        <input type="date" name="dischargeDate" onChange={handleDischargeInput} />
        <label htmlFor="criteria">Criteria</label>
        <input type="text" name="criteria" onChange={handleDischargeInput} />
      </span>
      <label htmlFor="diagnosisCodes">Diagnosis codes</label>
      <input type="text" name="diagnosisCodes" onChange={handleInputs} />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <button type="submit" style={{ width: 'fit-content', margin: '0.2rem' }}>Add Entry</button>
        <span style={{ flex: '1' }}></span>
        <button type="button" style={{ width: 'fit-content', }} onClick={() => setNewEntryActive(false)}>Cancel</button>
      </div>
    </form>
  )
}