import { Patient } from "../../types";
import { parseToString } from "../../utils";
import patientService from '../../services/patients';
import useForm from "../../hooks/useForm";
import { useState } from 'react';
import { useParams } from "react-router";

interface Props {
  setNewEntryActive: React.Dispatch<React.SetStateAction<boolean>>;
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

export default function OccupationalHealthcareForm({ setNewEntryActive, patients, setPatients }: Props) {
  const [sickLeaveInput, setSickLeaveInput] = useState({
    startDate: '',
    endDate: ''
  });
  const { id } = useParams();
  const { inputs, handleInputs } = useForm({
    description: '',
    date: '',
    specialist: '',
    sickLeave: {
      startDate: '',
      endDate: ''
    },
    employerName: '',
    type: 'OccupationalHealthcare',
    diagnosisCodes: []
  });

  function handleDischargeInput(e: React.ChangeEvent<HTMLInputElement>) {
    let { name, value } = e.target;

    setSickLeaveInput({
      ...sickLeaveInput,
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
      sickLeave: {
        startDate: sickLeaveInput.startDate,
        endDate: sickLeaveInput.endDate
      }
    }
    const parsedId = parseToString(id);

    const data = await patientService.addEntry(newEntry, parsedId);
    patients.filter(patient => patient.id === parsedId)[0].entries.concat(data);
    const newPatients = await patientService.getAll()
    setPatients(newPatients);
    setNewEntryActive(false);
  }

  console.log(inputs)

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
      <input type="text" name="employerName" onChange={handleInputs} />
      <span style={{ display: 'flex', flexDirection: 'row' }}>
        Sick Leave
        <label htmlFor="startDate">Start date</label>
        <input type="date" name="startDate" onChange={handleDischargeInput} />
        <label htmlFor="endDate">End date</label>
        <input type="date" name="endDate" onChange={handleDischargeInput} />
      </span>
      <label htmlFor="diagnosisCodes">Diagnosis codes</label>
      <input type="text" name="diagnosisCodes" onChange={handleInputs} />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <button type="submit" style={{ width: 'fit-content', margin: '0.2rem' }}>Add Entry</button>
        <span style={{ flex: '1' }}></span>
        <button
          type="button"
          style={{ width: 'fit-content', margin: '0.2rem' }}
          onClick={() => setNewEntryActive(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}