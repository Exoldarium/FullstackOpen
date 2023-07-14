import { useState } from 'react';
import PropTypes from 'prop-types';

export default function AddNewBlog({ addNewBlog }) {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  });

  function getUserInput(e) {
    const { name, value } = e.target;

    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  }

  function addNewBlogOnSubmit(e) {
    e.preventDefault();
    addNewBlog(newBlog);
    setNewBlog({
      title: '',
      author: '',
      url: ''
    });
  }

  return (
    <>
      <h1>Create New</h1>
      <form className="addNewBlogForm" onSubmit={addNewBlogOnSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" onChange={getUserInput} />
        <label htmlFor="author">Author:</label>
        <input type="text" name="author" onChange={getUserInput} />
        <label htmlFor="url">Url:</label>
        <input type="text" name="url" onChange={getUserInput} />
        <button type="submit">add</button>
      </form>
    </>
  )
}

AddNewBlog.propTypes = {
  addNewBlog: PropTypes.func.isRequired
}