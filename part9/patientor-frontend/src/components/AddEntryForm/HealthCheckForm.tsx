import { useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import patientService from '../../services/patients';
import { parseToString } from "../../utils";

interface Props {
  setNewEntryActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HealthCheckForm({ setNewEntryActive }: Props) {
  const { id } = useParams();
  const { inputs, handleInputs } = useForm({
    description: '',
    date: '',
    specialist: '',
    healthCheckRating: Number(),
    type: 'HealthCheck',
    diagnosisCodes: []
  });


  async function addNewEntry(e: React.SyntheticEvent) {
    e.preventDefault();
    const string = inputs.diagnosisCodes?.toString();
    const arr = string?.split(' ');
    const entries = {
      ...inputs,
      diagnosisCodes: arr
    }

    const parsedId = parseToString(id);

    await patientService.addEntry(entries, parsedId);
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
      <label htmlFor="healthCheckRating">Health rating</label>
      <input type="number" name="healthCheckRating" max="3" min="0" onChange={handleInputs} />
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