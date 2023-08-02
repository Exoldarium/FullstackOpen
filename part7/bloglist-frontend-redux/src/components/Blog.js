import { useDispatch } from 'react-redux';
import { deleteExistingBlog, updateExistingBlog } from '../reducers/blogReducer';
import { useNavigate } from 'react-router-dom';

export default function Blog({ blog }) {
  // TODO: remove button should only show for current users blogs
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const loggedUser = currentUser.id === blog.user.id;

  function deleteBlog() {
    dispatch(deleteExistingBlog(blog.id))
    navigate('/blogs');
  }

  if (!blog) {
    return null
  } else {
    return (
      <div style={{ border: '1px solid black' }}>
        <h1>{blog.title}</h1>
        <a href="#">{blog.url}</a>
        <div>
          <p>{blog.likes}</p>
          <button onClick={() => dispatch(updateExistingBlog(blog))}>like</button>
        </div>
        <p>added by {blog.author}</p>
        {/* {loggedUser && <button onClick={deleteBlog}>remove</button>} */}
      </div>
    )
  }
}