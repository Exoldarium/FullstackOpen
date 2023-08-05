import { useDispatch } from 'react-redux';
import { addNewComment, deleteExistingBlog, updateExistingBlog } from '../reducers/blogReducer';
import { useNavigate } from 'react-router-dom';
import useForm from '../utils/useForm';

export default function Blog({ blog, currentUser }) {
  console.log(blog)
  const [inputs, formService] = useForm({
    comment: ''
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function deleteBlog() {
    dispatch(deleteExistingBlog(blog.id))
    navigate('/blogs');
  }

  function addComment(e) {
    e.preventDefault();
    dispatch(addNewComment(inputs.comment, blog.id));
    formService.clearForm();
  }

  if (!blog || !currentUser) {
    return null
  } else {
    return (
      <>
        <div>
          <h1>{blog.title}</h1>
          <a href="#">{blog.url}</a>
          <div>
            <p>{blog.likes}</p>
            <button onClick={() => dispatch(updateExistingBlog(blog))}>like</button>
          </div>
          <p>added by {blog.author}</p>
          {currentUser.id === blog.user.id && <button onClick={deleteBlog}>remove</button>}
          <h1>comments</h1>
        </div>
        <form onSubmit={addComment}>
          <input name="comment" onChange={formService.getInputs} />
          <button type="submit">add a comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, i) => (
            <li key={i}>{comment.comment}</li>
          ))}
        </ul >
      </>
    )
  }
}