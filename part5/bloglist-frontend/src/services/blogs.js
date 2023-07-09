import axios from 'axios';

const baseUrl = '/api/blogs';
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
}

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
}

const addBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
}

const updateBlog = async (id, newBlog) => {
  const res = await axios.put(`${baseUrl}/${id}`, newBlog);
  return res.data;
}

const deleteBlog = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`);
  return res.data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  setToken,
  getAll,
  addBlog,
  updateBlog,
  deleteBlog
}