import { useDispatch } from 'react-redux';
import { deleteExistingBlog, updateExistingBlog } from '../reducers/blogReducer';
import { useNavigate } from 'react-router-dom';

export default function Blog({ blog, currentUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function deleteBlog() {
    dispatch(deleteExistingBlog(blog.id))
    navigate('/blogs');
  }

  if (!blog || !currentUser) {
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
        {currentUser.id === blog.user.id && <button onClick={deleteBlog}>remove</button>}
      </div>
    )
  }
}