import './index.css'
import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personsService from './services/persons'
import { v4 as uuidv4 } from 'uuid';
import NotificationMessage from './components/NotificationMessage'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({
    name: '',
    number: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const personsCopy = [...persons];
  const displayPersons = persons.map(person => <Persons persons={person} key={person.id} deletePerson={deletePerson} />);
  const personForm = <PersonForm getNewInput={getNewInput} input={newName} addNewPerson={addNewPerson} />;
  const filter = <Filter filterNames={filterNames} />;
  const notificationMessage = <NotificationMessage message={errorMessage} />;

  // get all the persons from db
  useEffect(() => {
    (async () => {
      const data = await personsService
        .getPersons()
        .catch(error => console.log(error));
      setPersons(data);
    })();
  }, []);

  // dynamically grab user input
  function getNewInput(e) {
    setNewName({
      ...newName,
      id: uuidv4(),
      [e.target.name]: e.target.value,
    });
  }

  // post a new person to db
  async function addNewPerson(e) {
    e.preventDefault();
    const findPerson = personsCopy.find(person => person.name === newName.name);
    // if the person is already in the db prompt user for a number change
    if (findPerson) {
      if (window.confirm(`${newName.name} is already in the phonebook, replace the old number with new one?`)) {
        const filterPerson = personsCopy.filter(person => person.id !== findPerson.id);
        const updatePerson = await personsService
          .updatePerson(findPerson.id, newName)
          .catch(error => {
            console.log(error);
          });
        setPersons(filterPerson.concat(updatePerson));
        setNewName({
          name: '',
          number: '',
        });
      }
      return;
    }

    const newPerson = await personsService
      .addPerson(newName)
      .catch(error => console.log(error));
    setPersons(personsCopy.concat(newPerson));
    setNewName({
      name: '',
      number: '',
    });

    setErrorMessage(`Added ${newPerson.name}`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000)
  }

  // delete selected person from the server and set new array
  function deletePerson(e) {
    e.preventDefault();
    const findPerson = personsCopy.find(person => person.id.toString() === e.target.id);
    if (window.confirm(`Delete ${findPerson.name}?`)) {
      const filterPerson = personsCopy.filter(person => person.id !== findPerson.id);
      personsService
        .deletePerson(e.target.id)
        .catch(error => console.log(error));
      setPersons(filterPerson);
    }
  }

  // we are making everything lowercase so that any input lowercase or uppercase always gives correct result
  function filterNames(e) {
    const findPerson = personsCopy.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setPersons(findPerson);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {notificationMessage}
      {filter}
      <h3>Add a new person</h3>
      {personForm}
      <h3>Numbers</h3>
      {displayPersons}
    </div>
  )
}

export default App
