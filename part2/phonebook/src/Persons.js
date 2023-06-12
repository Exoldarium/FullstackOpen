export default function Persons({ persons, deletePerson }) {
  return (
    <div>
      <p>
        {persons.name} {persons.number}
        <button onClick={deletePerson} id={persons.id} >delete</button>
      </p>
    </div>
  )
}