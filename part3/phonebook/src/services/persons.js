import axios from "axios";

const url = 'api/persons';

function getPersons() {
  const res = axios.get(url);
  return res.then(res => res.data);
}

function addPerson(newPerson) {
  console.log(newPerson);
  const res = axios.post(url, newPerson);
  return res.then(res => res.data);
}

function deletePerson(id) {
  const res = axios.delete(`${url}/${id}`);
  return res.then(res => res.data);
}

function updatePerson(id, newPerson) {
  const res = axios.put(`${url}/${id}`, newPerson);
  return res.then(res => res.data);
}

export default { getPersons, addPerson, deletePerson, updatePerson };