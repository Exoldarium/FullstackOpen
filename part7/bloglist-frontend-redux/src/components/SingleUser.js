export default function SingleUser({ user }) {
  console.log(user);
  if (!user) {
    return null
  } else {
    return (
      <div>
        <p>{user.name}</p>
        <h1>added blogs</h1>
        <p>added blogs {user.blogs.length}</p>
      </div>
    )
  }
}