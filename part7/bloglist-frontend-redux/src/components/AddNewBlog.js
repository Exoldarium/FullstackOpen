import { useRef } from 'react';
import useForm from '../utils/useForm';

export default function AddNewBlog({ addNewBlog }) {
  const [inputs, formService] = useForm({
    title: '',
    author: '',
    url: '',
  });
  // const blogFormRef = useRef();

  function addNewBlogOnSubmit(e) {
    e.preventDefault();
    // blogFormRef.current.toggleVisible();
    addNewBlog(inputs);
    formService.clearForm();
  }

  return (
    <>
      <h1>Create New</h1>
      <form className="addNewBlogForm" onSubmit={addNewBlogOnSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          onChange={formService.getInputs}
          className="titleInput"
          data-cy="titleInput"
        />
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          name="author"
          onChange={formService.getInputs}
          className="authorInput"
          data-cy="authorInput"
        />
        <label htmlFor="url">Url:</label>
        <input
          type="text"
          name="url"
          onChange={formService.getInputs}
          className="urlInput"
          data-cy="urlInput"
        />
        <button type="submit" data-cy="addNewBlogButton">
          add
        </button>
      </form>
    </>
  );
}
