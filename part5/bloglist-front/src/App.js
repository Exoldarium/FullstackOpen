import './index.css'
import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import AddNewBlog from './components/AddNewBlog';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const blog = blogs.map(blog => <Blog key={blog.id} blog={blog} />);
  const notification = <Notification message={errorMessage} />
  const addNewBlog = <AddNewBlog input={newBlog} addNewBlog={addNewBlogOnClick} />;

  useEffect(() => {
    (async () => {
      const res = await blogService.getAll();
      setBlogs(res);
    })();
  }, []);

  useEffect(() => {
    // we grab our user details from local storage so that user stays logged in
    const loggedUser = localStorage.getItem('loginCredentials');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // we send a post request to api/login and get back our user details
      // we set our logged in user's details in a state
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loginCredentials', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  const handleLogout = () => {
    window.localStorage.clear();
    setUser('');
  }

  const addNewBlogOnClick = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  }

  const loginForm = (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const userInfo = (
    <div>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );

  return (
    <div>
      <h2>blogs</h2>
      {notification}
      {user ? userInfo : loginForm}
      {user ? blog : ''}
      {addNewBlog}
    </div>
  )
}

export default App;