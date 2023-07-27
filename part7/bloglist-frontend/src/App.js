import './index.css';
import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import NotificationMessage from './components/NotificationMessage';
import AddNewBlog from './components/AddNewBlog';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';
import Toggleable from './components/Toggleable';
import useBlogService from './utils/useBlogService';
import useUserService from './utils/useUserService';

const App = () => {
  const [blogs, blogService] = useBlogService();
  const [user, loginService, setUser] = useUserService();

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const blogFormRef = useRef();

  useEffect(() => {
    // we grab our user details from local storage so that user stays logged in
    const loggedUser = localStorage.getItem('loginCredentials');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  function handleLogin({ username, password }) {
    try {
      loginService.login({ username, password });
    } catch (exception) {
      setErrorMessage('wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  function addNewBlog(newBlog) {
    try {
      // we can change the visibility of our elements from outside of the component using href
      blogFormRef.current.toggleVisible();
      blogService.setToken(user.token);
      blogService.addBlog(newBlog);

      // setSuccessMessage(`a new blog ${res.title} by ${res.author} added`);
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

  function addNewLike({ blog }) {
    try {
      const newBlog = {
        user: blog.user.id,
        likes: blog.likes,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      };

      blogService.updateBlog(blog.id, newBlog);
      setSuccessMessage(`added a like for ${newBlog.title} by ${newBlog.author}`);
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

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage && <NotificationMessage error={errorMessage} />}
      {successMessage && <NotificationMessage success={successMessage} />}
      {user ? (
        <UserInfo handleLogout={() => loginService.logout()} user={user} />
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
      {user && (
        <Toggleable ref={blogFormRef}>
          <AddNewBlog addNewBlog={addNewBlog} />
        </Toggleable>
      )}
      {user && <button onClick={() => blogService.sortBlogs()}>sort</button>}
      {user &&
        blogs.map((blog, i) => (
          <Blog
            key={i}
            blog={blog}
            addNewLike={addNewLike}
            deleteSelectedBlog={({ blog }) => blogService.deleteBlog(blog.id)}
            user={user}
          />
        ))}
    </div>
  );
};

export default App;
