import axios from "axios";

const url = 'http://localhost:3001/api/persons';

async function getPersons() {
  const res = await axios.get(url);
  return res.data;
}

async function addPerson(newPerson) {
  const res = await axios.post(url, newPerson);
  return res.data;
}

async function deletePerson(id) {
  const res = await axios.delete(`http://localhost:3001/api/persons/${id}`);
  return res.data;
}

async function updatePerson(url, newPerson) {
  console.log(url, newPerson);
  const res = await axios.put(url, newPerson);
  return res.data;
}

export default { getPersons, addPerson, deletePerson, updatePerson };