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
import { useAddBlogMutation, useBlogsQuery, useDeleteBlogMutation, useUpdateBlogMutation } from './services/blogService';

const App = () => {
  const [blogs, blogService] = useBlogService();
  const [user, loginService] = useUserService();
  const [addBlog] = useAddBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();
  const { data, isSuccess } = useBlogsQuery();

  console.log(data, isSuccess)

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const blogFormRef = useRef();

  useEffect(() => {
    // we grab our user details from local storage so that user stays logged in
    const loggedUser = localStorage.getItem('loginCredentials');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      loginService.setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  async function handleLogin({ username, password }) {
    loginService.login({ username, password })

    // if (res.response.data.error) {
    //   setErrorMessage(`${res.response.data.error}`);
    //   setTimeout(() => {
    //     setErrorMessage(null);
    //   }, 5000);
    // }
  }

  async function addNewBlog(newBlog) {
    try {
      // we can change the visibility of our elements from outside of the component using href
      blogFormRef.current.toggleVisible();
      blogService.setToken(user.token);
      const body = {
        newBlog,
        token: user.token
      }
      addBlog(body);

      setSuccessMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`);
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

  function addNewLike(blog) {
    const id = blog.id;

    try {
      const newBlog = {
        user: blog.user.id,
        likes: blog.likes,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      };
      // blogService.updateBlog(blog.id, newBlog);
      const body = {
        newBlog,
        id,
        token: user.token
      }
      updateBlog(body)
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

  function handleDelete(blog) {
    const body = {
      id: blog.id,
      token: user.token
    }
    deleteBlog(body);
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
      {(user && isSuccess) &&
        data.map((blog, i) => (
          <Blog
            key={i}
            blog={blog}
            addNewLike={addNewLike}
            // deleteSelectedBlog={({ blog }) => blogService.deleteBlog(blog.id)}
            deleteSelectedBlog={handleDelete}
            user={user}
          />
        ))}
    </div>
  );
};

export default App;
