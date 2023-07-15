import { useState } from 'react';

export default function Blog({ blog, addNewLike, deleteSelectedBlog, user }) {
  const [descriptive, setDescriptive] = useState(false);

  const expandedView = { height: 'fit-content' }
  const hiddenView = { height: '5vh' }

  // check if the logged user is the same as the blog creator
  const loggedUserBlog = blog.user.id === user.id || blog.user === user.id;

  function expandView() {
    setDescriptive(!descriptive);
  }

  function addLike() {
    blog.likes += 1;
    addNewLike({ blog });
  }

  function deleteBlog() {
    console.log(blog)
    if (window.confirm(`are you sure you want to delete ${blog.title} by ${blog.author}`)) {
      deleteSelectedBlog({ blog });
    }
  }

  return (
    <div className="blogDiv" style={descriptive ? expandedView : hiddenView}>
      <p>
        {blog.title}
        <button onClick={expandView} className="expandBlog">{descriptive ? 'hide' : 'show'}</button>
      </p>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}
        <button onClick={addLike} id={blog.id} className="likeButton">like</button>
      </p>
      {/* the user can only delete the blogs he created */}
      {loggedUserBlog && <button style={{ width: 'fit-content' }} onClick={deleteBlog}>remove</button>}
    </div >
  )
}