import { Link } from 'react-router-dom';

export default function BlogList({ blogs }) {
  return (
    <>
      {blogs.map(blog =>
        <Link to={`/blogs/${blog.id}`} key={blog.id}>
          <div style={{ border: '1px solid black' }}>
            {blog.title}
          </div>
        </Link>
      )}
    </>
  );
}
