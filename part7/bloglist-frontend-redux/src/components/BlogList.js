import { Link } from 'react-router-dom';
import { BlogStyles } from '../styles/BlogStyles';

export default function BlogList({ blogs }) {
  return (
    <>
      {blogs.map(blog =>
        <Link to={`/blogs/${blog.id}`} key={blog.id} style={{ textDecoration: 'none' }}>
          <BlogStyles>
            {blog.title}
          </BlogStyles>
        </Link>
      )}
    </>
  );
}
