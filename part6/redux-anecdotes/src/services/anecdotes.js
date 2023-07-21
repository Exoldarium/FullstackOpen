import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes';

async function getAll() {
  const res = await axios.get(baseUrl);
  return res.data;
}

async function createNew(content) {
  const newAnecdote = {
    content,
    votes: 0
  }
  const res = await axios.post(baseUrl, newAnecdote);
  return res.data;
}

async function updateExisting(id, content) {
  const res = await axios.put(`${baseUrl}/${id}`, content);
  return res.data;
}

const anecdoteService = {
  getAll, createNew, updateExisting
}
export default anecdoteService
