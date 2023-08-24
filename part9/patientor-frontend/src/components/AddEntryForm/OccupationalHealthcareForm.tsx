interface Props {
  setNewEntryActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OccupationalHealthcareForm({ setNewEntryActive }: Props) {
  return (
    <form style={{
      display: 'flex',
      flexDirection: 'column',
      border: '2px dotted black',
      padding: '0.5rem',
      margin: '0.5rem 0 0.5rem 0'
    }}>
      <label htmlFor="description">Description</label>
      <input type="text" name="description" required />
      <label htmlFor="date">Date</label>
      <input type="date" name="date" required />
      <label htmlFor="specialist">Specialist</label>
      <input type="text" name="specialist" required />
      <label htmlFor="employer">Employer</label>
      <input type="text" name="employer" />
      <span style={{ display: 'flex', flexDirection: 'row' }}>
        Sick Leave
        <label htmlFor="startDate">Start date</label>
        <input type="date" name="startDate" />
        <label htmlFor="endDate">End date</label>
        <input type="date" name="endDate" />
      </span>
      <label htmlFor="codes">Diagnosis codes</label>
      <input type="text" name="codes" />
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