import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes';

export async function getAll() {
  const res = await axios.get(baseUrl);
  return res.data;
}

export async function createNew(content) {
  if (content.content.length < 5) throw Error('anecdote should have more than 5 characters')
  try {
    const res = await axios.post(baseUrl, content);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function updateExisting(content) {
  const res = await axios.put(`${baseUrl}/${content.id}`, content);
  return res.data;
}