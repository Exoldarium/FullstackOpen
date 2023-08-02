import { useDispatch } from 'react-redux';
import useForm from '../utils/useForm';
import { addNewBlog } from '../reducers/blogReducer';
import { useNavigate } from 'react-router-dom';

export default function AddNewBlog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, formService] = useForm({
    title: '',
    author: '',
    url: '',
  });

  function addNewBlogOnSubmit(e) {
    e.preventDefault();
    dispatch(addNewBlog(inputs));
    navigate('/blogs');
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
