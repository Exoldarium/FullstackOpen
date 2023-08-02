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
import { Route, Routes, useMatch } from 'react-router-dom';
import SingleUser from './components/SingleUser';
import BlogList from './components/BlogList';
import Blog from './components/Blog';
import { initializeUsers } from './reducers/userReducer';

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
  const users = useSelector(({ users }) => {
    return users
  });

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  const blogMatch = useMatch('/blogs/:id');
  const userMatch = useMatch('/users/:id');
  const findBlog = blogMatch ? blogsData.find(blog => blog.id === blogMatch.params.id) : null;
  const findUser = userMatch ? users.find(user => user.id === userMatch.params.id) : null;
  console.log({ blogs: blogsData, users: users })

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
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/users/:id" element={<SingleUser user={findUser} />} />
            <Route path="/blogs/:id" element={<Blog blog={findBlog} currentUser={loginData} />} />
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