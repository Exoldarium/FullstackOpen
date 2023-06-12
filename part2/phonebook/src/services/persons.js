import axios from "axios";

const url = 'http://localhost:3001/persons';

async function getPersons() {
  const res = await axios.get(url);
  return res.data;
}

async function addPerson(newPerson) {
  const res = await axios.post(url, newPerson);
  return res.data;
}

async function deletePerson(id) {
  const res = await axios.delete(`http://localhost:3001/persons/${id}`);
  return res.data;
}

async function updatePerson(id, newPerson) {
  const res = await axios.put(`http://localhost:3001/persons/${id}`, newPerson);
  return res.data;
}

export default { getPersons, addPerson, deletePerson, updatePerson };