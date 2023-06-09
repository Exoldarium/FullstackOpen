import { useState } from 'react'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Filter from './Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState({
    name: '',
    number: '',
  });
  const personsCopy = [...persons];
  const displayPersons = persons.map(person => <Persons persons={person} key={person.id} />);
  const personForm = <PersonForm getNewInput={getNewInput} input={newName} addNewPerson={addNewPerson} />;
  const filter = <Filter filterNames={filterNames} />

  // dynamically grab user input
  function getNewInput(e) {
    setNewName({
      ...newName,
      id: persons.length + 1,
      [e.target.name]: e.target.value,
    });
  }

  function addNewPerson(e) {
    e.preventDefault();
    for (const key of personsCopy) {
      if (key.name === newName.name) {
        window.alert(`${newName.name} is already in the phonebook!`);
        return;
      }
    }
    setPersons(personsCopy.concat(newName));
    setNewName({
      name: '',
      number: '',
    });
  }

  // we are making everything lowercase so that any input lowercase or uppercase always gives correct result
  function filterNames(e) {
    const findPerson = personsCopy.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setPersons(findPerson);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {filter}
      <h3>Add a new</h3>
      {personForm}
      <h3>Numbers</h3>
      {displayPersons}
    </div>
  )
}

export default App
