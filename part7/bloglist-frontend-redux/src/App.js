import './index.css';
import { useEffect } from 'react';
import NotificationMessage from './components/NotificationMessage';
import AddNewBlog from './components/AddNewBlog';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import Users from './components/Users';
import Nav from './components/Nav';
import { Route, Routes } from 'react-router-dom';
import SingleUser from './components/SingleUser';
import BlogList from './components/BlogList';

const App = () => {
  const dispatch = useDispatch();
  const blogsData = useSelector(({ blogs }) => {
    return blogs
  });
  const loginData = useSelector(({ login }) => {
    if (login !== 'LOGIN') {
      return login
    }
  });

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div>
      <h2>blogs</h2>
      <Nav />
      <NotificationMessage />
      {loginData ? <UserInfo /> : <LoginForm />}
      <Routes>
        {loginData &&
          <>
            <Route path="/create" element={<AddNewBlog />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<SingleUser />} />
          </>
        }
        {(loginData && blogsData) &&
          <Route path="/blogs" element={<BlogList blogs={blogsData} />} />
        }
      </Routes>
    </div>
  );
}

export default App;