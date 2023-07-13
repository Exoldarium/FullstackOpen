export default function UserInfo({ handleLogout, user }) {
  return (
    <div>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Log out</button>
    </div>
  )
}