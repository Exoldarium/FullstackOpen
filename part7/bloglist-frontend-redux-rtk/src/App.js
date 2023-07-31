import './index.css';
import { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import NotificationMessage from './components/NotificationMessage';
import AddNewBlog from './components/AddNewBlog';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';
import Toggleable from './components/Toggleable';
import useUserService from './utils/useUserService';
import {
  useAddBlogMutation,
  useBlogsQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
  useUserLoginMutation
} from './services/blogService';
import { useDispatch } from 'react-redux';
import { setMessage } from './reducers/messageReducer';

const App = () => {
  const [user, loginService] = useUserService();
  const [addBlog] = useAddBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();
  const [userLogin] = useUserLoginMutation();
  // TODO: set the blogs into a redux state
  const { data, isSuccess } = useBlogsQuery();
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  useEffect(() => {
    // we grab our user details from local storage so that user stays logged in
    const loggedUser = localStorage.getItem('loginCredentials');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      loginService.setUser(user);
    }
  }, []);

  async function handleLogin({ username, password }) {
    const res = await userLogin({ username, password });
    loginService.setUser(res.data);
    window.localStorage.setItem('loginCredentials', JSON.stringify(res.data));
  }

  function addNewBlog(newBlog) {
    try {
      // we can change the visibility of our elements from outside of the component using href
      blogFormRef.current.toggleVisible();

      const body = {
        newBlog,
        token: user.token
      }

      addBlog(body);

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

  function addNewLike(blog) {
    const id = blog.id;

    try {
      const newBlog = {
        user: blog.user.id,
        likes: blog.likes,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      }

      const body = {
        newBlog,
        id,
        token: user.token
      }

      updateBlog(body);

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

  function handleDelete(blog) {
    const body = {
      id: blog.id,
      token: user.token
    }

    deleteBlog(body);
  }

  function sortBlogs() {
    console.log(data)
    data.sort(
      (firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes,
    );
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
      {user && <button onClick={sortBlogs}>sort</button>}
      {(user && isSuccess) &&
        data.map((blog, i) => (
          <Blog
            key={i}
            blog={blog}
            addNewLike={addNewLike}
            deleteSelectedBlog={handleDelete}
            user={user}
          />
        ))}
    </div>
  );
};

export default App;
