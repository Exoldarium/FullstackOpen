export default function AddNewBlog({ input, getUserInput, addNewBlogOnSubmit }) {
  return (
    <>
      <h1>Create New</h1>
      <form className="addNewBlogForm" onSubmit={addNewBlogOnSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" value={input.title} onChange={getUserInput} />
        <label htmlFor="author">Author:</label>
        <input type="text" name="author" value={input.author} onChange={getUserInput} />
        <label htmlFor="url">Url:</label>
        <input type="text" name="url" value={input.url} onChange={getUserInput} />
        <button type="submit">add</button>
      </form>
    </>
  )
}