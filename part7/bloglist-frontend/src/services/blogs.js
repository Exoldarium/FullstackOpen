// import axios from 'axios';

// const baseUrl = 'api/blogs';
// let token = null;

// // we set our token
// const setToken = (newToken) => {
//   token = `Bearer ${newToken}`;
// };

// const getAll = async () => {
//   const res = await axios.get(baseUrl);
//   return res.data;
// };

// const addBlog = async (newBlog) => {
//   // we add the token to our header
//   const config = {
//     headers: { Authorization: token },
//   };
//   const res = await axios.post(baseUrl, newBlog, config);
//   return res.data;
// };

// const updateBlog = async (id, newBlog) => {
//   const config = {
//     headers: { Authorization: token },
//   };
//   const res = await axios.put(`${baseUrl}/${id}`, newBlog, config);
//   return res.data;
// };

// const deleteBlog = async (id) => {
//   const config = {
//     headers: { Authorization: token },
//   };
//   const res = await axios.delete(`${baseUrl}/${id}`, config);
//   return res.data;
// };

// export default {
//   updateBlog,
//   deleteBlog,
// };
