export default function SingleUser({ user }) {
  if (!user) {
    return null
  } else {
    return (
      <div>
        <p>{user.name}</p>
        <h1>added blogs</h1>
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
  }
}