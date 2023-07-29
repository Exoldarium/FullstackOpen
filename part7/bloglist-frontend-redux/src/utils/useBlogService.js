import { useState } from 'react';

let token = null;

export default function useBlogService() {
  const [blogs, setBlogs] = useState([]);
  const copy = [...blogs]

  function sortBlogs() {
    copy.sort(
      (firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes,
    );
    setBlogs(copy);
  }

  const service = {
    sortBlogs
  }

  return [
    blogs,
    service
  ]
}