import { useState } from 'react';

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