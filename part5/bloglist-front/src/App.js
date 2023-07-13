import './index.css'
import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import NotificationMessage from './components/NotificationMessage';
import blogService from './services/blogs';
import loginService from './services/login';
import AddNewBlog from './components/AddNewBlog';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';
import Toggleable from './components/Toggleable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const blogFormRef = useRef();

  const blogCopy = [...blogs];

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

  async function handleLogin({ username, password }) {
    try {
      // we send a post request to api/login and get back our user details
      // we set our logged in user's details in a state
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loginCredentials', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
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

  async function addNewBlog(newBlog) {
    try {
      // we can change the visibility of our elements from outside of the component using href
      blogFormRef.current.toggleVisible();
      const res = await blogService.addBlog(newBlog);
      const newBloglist = blogCopy.concat(res);

      setBlogs(newBloglist);
      setSuccessMessage(`a new blog ${res.title} by ${res.author} added`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage('error bad request');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  async function addNewLike({ blog }) {
    try {
      const newBlog = {
        user: blog.user.id,
        likes: blog.likes,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }

      const res = await blogService.updateBlog(blog.id, newBlog);
      // we set our blogCopy as our main blog state in order to rerender the page
      setBlogs(blogCopy);
      setSuccessMessage(`added a like for ${res.title} by ${res.author}`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage('error bad request');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  function deleteSelectedBlog({ blog }) {
    blogService.deleteBlog(blog.id);
    setBlogs(blogs);
  }

  function sortBlogs() {
    const sorted = blogCopy.sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes);
    setBlogs(sorted);
  }

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage && <NotificationMessage error={errorMessage} />}
      {successMessage && <NotificationMessage success={successMessage} />}
      {user ?
        <UserInfo
          handleLogout={handleLogout}
          user={user}
        /> :
        <LoginForm
          handleLogin={handleLogin}
        />
      }
      {user &&
        <Toggleable ref={blogFormRef}>
          <AddNewBlog
            addNewBlog={addNewBlog}
          />
        </Toggleable>
      }
      <button onClick={sortBlogs}>sort</button>
      {user &&
        blogCopy.map(
          (blog, i) =>
            <Blog
              key={i}
              blog={blog}
              addNewLike={addNewLike}
              deleteSelectedBlog={deleteSelectedBlog}
            />
        )
      }
    </div>
  );
}

export default App;