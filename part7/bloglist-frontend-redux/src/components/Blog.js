import { useState } from 'react';
import { deleteExistingBlog, updateExistingBlog } from '../reducers/blogReducer';
import { useDispatch } from 'react-redux';

export default function Blog({ blog, user }) {
  const dispatch = useDispatch();
  const [descriptive, setDescriptive] = useState(false);

  const expandedView = { height: 'fit-content' };
  const hiddenView = { height: '5vh' };

  // check if the logged user is the same as the blog creator
  const loggedUserBlog = blog.user.id === user.id || blog.user === user.id;

  function expandView() {
    setDescriptive(!descriptive);
  }

  function handleDeleteBlog() {
    if (window.confirm(`are you sure you want to delete ${blog.title} by ${blog.author}`)) {
      dispatch(deleteExistingBlog(blog.id));
    }
  }

  return (
    <div className="blogDiv" style={descriptive ? expandedView : hiddenView}>
      <p data-cy="blogTitle">
        {blog.title}
        <button onClick={expandView} className="expandBlog">
          {descriptive ? 'hide' : 'show'}
        </button>
      </p>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}
        <button
          onClick={() => dispatch(updateExistingBlog(blog))}
          id={blog.id}
          className="likeButton"
          data-cy="likeButton"
        >
          like
        </button>
      </p>
      {/* the user can only delete the blogs he created */}
      {loggedUserBlog && (
        <button
          style={{ width: 'fit-content' }}
          onClick={handleDeleteBlog}
          id={blog.user.id || blog.user}
          data-cy="removeButton"
        >
          remove
        </button>
      )}
    </div>
  );
}
