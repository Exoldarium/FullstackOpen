import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes';

async function getAll() {
  const res = await axios.get(baseUrl);
  return res.data;
}

async function createNew(content) {
  const newAnecdote = {
    content,
    vote: 0
  }
  const res = await axios.post(baseUrl, newAnecdote);
  return res.data;
}

export default { getAll, createNew }
