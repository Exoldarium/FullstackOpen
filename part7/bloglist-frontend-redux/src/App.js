import './index.css';
import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import NotificationMessage from './components/NotificationMessage';
import AddNewBlog from './components/AddNewBlog';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';
import Toggleable from './components/Toggleable';
import blogService from '../src/services/blogs';
import loginService from '../src/services/login';
import { setMessage } from './reducers/messageReducer';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState('');
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const blogCopy = [...blogs];
  const blogsData = useSelector(({ blogs }) => {
    return blogs
  });


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);

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
      dispatch(setMessage({
        content: 'wrong credentials',
        type: 'ERROR'
      }, 5));
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

  async function addNewLike({ blog }) {
    try {
      const newBlog = {
        user: blog.user.id,
        likes: blog.likes,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }

      await blogService.updateBlog(blog.id, newBlog);
      // we set our blogCopy as our main blog state in order to rerender the page
      setBlogs(blogCopy);
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

  function deleteSelectedBlog({ blog }) {
    blogService.deleteBlog(blog.id);
    const newBlogList = blogCopy.filter(blogList => blogList.id !== blog.id);
    setBlogs(newBlogList);
  }

  function sortBlogs() {
    const sorted = blogCopy.sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes);
    setBlogs(sorted);
  }

  return (
    <div>
      <h2>blogs</h2>
      <NotificationMessage />
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
      {user && <button onClick={sortBlogs}>sort</button>}
      {(user && blogsData) &&
        blogsData.map(
          (blog, i) =>
            <Blog
              key={i}
              blog={blog}
              addNewLike={addNewLike}
              deleteSelectedBlog={deleteSelectedBlog}
              user={user}
            />
        )
      }
    </div>
  );
}

export default App;