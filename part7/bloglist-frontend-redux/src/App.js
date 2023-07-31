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
import { setMessage } from './reducers/messageReducer';
import { useDispatch } from 'react-redux';

const App = () => {
  const [blogs, blogService] = useBlogService();
  const [user, loginService] = useUserService();
  const blogFormRef = useRef();
  const dispatch = useDispatch()

  useEffect(() => {
    // we grab our user details from local storage so that user stays logged in
    const loggedUser = localStorage.getItem('loginCredentials');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      loginService.setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  function handleLogin({ username, password }) {
    loginService.login({ username, password })
  }

  async function addNewBlog(newBlog) {
    try {
      // we can change the visibility of our elements from outside of the component using href
      blogFormRef.current.toggleVisible();
      blogService.setToken(user.token);
      blogService.addBlog(newBlog);

      dispatch(setMessage({
        content: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        type: 'SUCCESS'
      }, 5));
    } catch (exception) {
      dispatch(setMessage({
        content: 'bad request',
        type: 'ERROR'
      }, 5));
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
      }

      blogService.updateBlog(blog.id, newBlog);

      dispatch(setMessage({
        content: `added like for ${newBlog.title} by ${newBlog.author}`,
        type: 'SUCCESS'
      }, 5));
    } catch (exception) {
      dispatch(setMessage({
        content: 'bad request',
        type: 'ERROR'
      }, 5));
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <NotificationMessage />
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
