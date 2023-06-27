import axios from "axios";

const url = 'api/persons';

async function getPersons() {
  const res = await axios.get(url);
  return res.data;
}

async function addPerson(newPerson) {
  console.log(newPerson);
  const res = await axios.post(url, newPerson);
  return res.data;
}

async function deletePerson(id) {
  const res = await axios.delete(`${url}/${id}`);
  return res.data;
}

async function updatePerson(id, newPerson) {
  const res = await axios.put(`${url}/${id}`, newPerson);
  return res.data;
}

export default { getPersons, addPerson, deletePerson, updatePerson };