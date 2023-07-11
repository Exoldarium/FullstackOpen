export default function AddNewBlog({ newBlog, addNewBlog }) {
  return (
    <>
      <h1>Create New</h1>
      <form className="addNewBlogForm">
        <label htmlFor="Title">Title:</label>
        <input type="text" name="Title" value={newBlog.title} />
        <label htmlFor="Author">Author:</label>
        <input type="text" name="Author" value={newBlog.author} />
        <label htmlFor="Url">Url:</label>
        <input type="text" name="Url" value={newBlog.url} />
      </form>
      <button onClick={addNewBlog}>Create</button>
    </>
  )
}