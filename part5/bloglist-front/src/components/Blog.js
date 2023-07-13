import { useState } from "react"

export default function Blog({ blog, addNewLike, deleteSelectedBlog }) {
  const [descriptive, setDescriptive] = useState(false);

  const expandedView = { height: 'fit-content' }
  const hiddenView = { height: '5vh' }

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
        <button onClick={expandView}>{descriptive ? 'hide' : 'show'}</button>
      </p>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}
        <button onClick={addLike} id={blog.id}>like</button>
      </p>
      <button style={{ width: 'fit-content' }} onClick={deleteBlog}>remove</button>
    </div >
  )
}