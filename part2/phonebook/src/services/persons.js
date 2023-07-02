import axios from "axios";

const url = 'http://localhost:3001/persons';

function getPersons() {
  const res = axios.get(url);
  return res.then(res => res.data);
}

function addPerson(newPerson) {
  const res = axios.post(url, newPerson);
  return res.then(res => res.data);
}

function deletePerson(id) {
  const res = axios.delete(`http://localhost:3001/persons/${id}`);
  return res.then(res => res.data);
}

function updatePerson(id, newPerson) {
  const res = axios.put(`http://localhost:3001/persons/${id}`, newPerson);
  return res.then(res => res.data);
}

export default { getPersons, addPerson, deletePerson, updatePerson };