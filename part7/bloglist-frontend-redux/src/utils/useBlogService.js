// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { initializeBlogs } from '../reducers/blogReducer';

// let token = null;
// const baseUrl = 'api/blogs';

// export default function useBlogService() {
//   const [blogs, setBlogs] = useState([]);
//   const dispatch = useDispatch();
//   const copy = [...blogs]

//   useEffect(() => {
//     dispatch(initializeBlogs())
//   }, [dispatch]);

//   function setToken(newToken) {
//     token = `Bearer ${newToken}`;
//   };

//   async function getAll() {
//     const res = await axios.get(baseUrl);
//     return res.data;
//   }

//   async function addBlog(newBlog) {
//     // we add the token to our header
//     const config = {
//       headers: { Authorization: token },
//     };
//     console.log(newBlog, config)
//     const res = await axios.post(baseUrl, newBlog, config);
//     setBlogs(blogs.concat(res.data));
//   };

//   async function updateBlog(id, newBlog) {
//     const config = {
//       headers: { Authorization: token },
//     };
//     const res = await axios.put(`${baseUrl}/${id}`, newBlog, config);
//     const updatedBlog = blogs.filter(blog => blog.id !== res.id);
//     setBlogs(updatedBlog);
//   };

//   async function deleteBlog(id) {
//     const config = {
//       headers: { Authorization: token },
//     };
//     await axios.delete(`${baseUrl}/${id}`, config);
//     const updatedBlog = blogs.filter(blog => blog.id !== id);
//     setBlogs(updatedBlog);
//   };

//   function sortBlogs() {
//     copy.sort(
//       (firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes,
//     );
//     setBlogs(copy);
//   }

//   const service = {
//     addBlog,
//     updateBlog,
//     deleteBlog,
//     setToken,
//     sortBlogs,
//     getAll
//   }

//   return [
//     blogs,
//     service
//   ]
// }