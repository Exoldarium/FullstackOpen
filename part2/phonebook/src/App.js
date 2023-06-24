import './index.css'
import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personsService from './services/persons'
import NotificationMessage from './components/NotificationMessage'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({
    name: '',
    number: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const personsCopy = [...persons];
  const displayPersons = personsCopy.map(person => <Persons persons={person} key={person.id} deletePerson={deletePerson} />);
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
      [e.target.name]: e.target.value,
    });
  }

  // post a new person to db
  async function addNewPerson(e) {
    e.preventDefault();
    const findPerson = personsCopy.find(person => person.name === newName.name);
    const replaceDetails = { ...findPerson, number: newName.number };
    const url = `http://localhost:3001/api/persons/${findPerson.id}`;
    // if the person is already in the db prompt user for a number change
    if (findPerson) {
      // TODO:
      // user should be able to add a new number for an existing entry
      if (window.confirm(`${newName.name} is already in the phonebook, replace the old number with new one?`)) {
        const filterPerson = personsCopy.filter(person => person.id !== findPerson.id);
        const updatePerson = await personsService
          .updatePerson(url, replaceDetails)
          .catch(error => {
            console.log(error);
          });
        // console.log(newName);
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
    console.log(findPerson)
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
