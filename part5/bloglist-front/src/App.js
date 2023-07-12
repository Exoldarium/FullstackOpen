import './index.css'
import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import NotificationMessage from './components/NotificationMessage';
import blogService from './services/blogs';
import loginService from './services/login';
import AddNewBlog from './components/AddNewBlog';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  console.log(blogs);
  const blogCopy = [...blogs];
  const blog = blogs.map(blog => <Blog key={blog.id} blog={blog} />);
  const addNewBlog = <AddNewBlog input={newBlog} getUserInput={getUserInput} addNewBlogOnSubmit={addNewBlogOnSubmit} />;
  const notificationMessage =
    errorMessage ? <NotificationMessage error={errorMessage} /> : <NotificationMessage success={successMessage} />;

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

  async function handleLogin(e) {
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

  function handleLogout() {
    window.localStorage.clear();
    setUser('');
  }

  function getUserInput(e) {
    const { name, value } = e.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  }

  async function addNewBlogOnSubmit(e) {
    e.preventDefault();
    console.log(e.target)
    try {
      const res = await blogService.addBlog(newBlog);
      const newBloglist = blogCopy.concat(res);
      setBlogs(newBloglist);
      setNewBlog({
        title: '',
        author: '',
        url: ''
      });
      setTimeout(() => {
        setSuccessMessage(`a new blog ${res.title} by ${res.author} added`);
      }, 5000);
    } catch (exception) {
      setErrorMessage('error bad request');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
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
      {notificationMessage}
      {user ? userInfo : loginForm}
      {user && blog}
      {user && addNewBlog}
    </div>
  )
}

export default App;