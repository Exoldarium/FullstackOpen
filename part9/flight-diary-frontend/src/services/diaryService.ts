import axios from "axios";
import { parseDiaryEntry } from "../utils";
import { NewDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3001/api';

async function getAll() {
  const res = await axios.get(`${baseUrl}/diaries`);

  const arr = [];
  for (const key of res.data) {
    const data = parseDiaryEntry(key);
    arr.push(data);
  }

  return arr;
}

async function createNew(newEntry: NewDiaryEntry) {
  const res = await axios.post(`${baseUrl}/diaries`, newEntry);
  const data = parseDiaryEntry(res.data);

  return data;
}

export default { getAll, createNew }