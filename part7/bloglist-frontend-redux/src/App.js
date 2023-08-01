import './index.css';
import { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import NotificationMessage from './components/NotificationMessage';
import AddNewBlog from './components/AddNewBlog';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';
import Toggleable from './components/Toggleable';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs, sortExistingBlogs } from './reducers/blogReducer';

const App = () => {
  const dispatch = useDispatch();
  const blogsData = useSelector(({ blogs }) => {
    return blogs
  });
  const user = useSelector(({ user }) => {
    if (user !== 'USER') {
      return user
    }
  });
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);

  return (
    <div>
      <h2>blogs</h2>
      <NotificationMessage />
      {user ? <UserInfo /> : <LoginForm />}
      {user &&
        <Toggleable ref={blogFormRef}>
          <AddNewBlog />
        </Toggleable>
      }
      {user &&
        <button onClick={() => dispatch(sortExistingBlogs())}>sort</button>
      }
      {(user && blogsData) &&
        blogsData.map(
          (blog, i) =>
            <Blog
              key={i}
              blog={blog}
              user={user}
            />
        )
      }
    </div>
  );
}

export default App;