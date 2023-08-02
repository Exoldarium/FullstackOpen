import Blog from './Blog';

export default function BlogList({ blogs }) {
  return (
    <>
      {blogs.map(blog =>
        <Blog blog={blog} key={blog.id} />
      )}
    </>
  );
}
