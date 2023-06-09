export default function PersonForm({ getNewInput, input, addNewPerson }) {
  return (
    <form onSubmit={addNewPerson}>
      <div>
        name: <input onChange={getNewInput} name="name" value={input.name} type="text" />
      </div>
      <div>
        number: <input onChange={getNewInput} name="number" value={input.number} type="number" />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}