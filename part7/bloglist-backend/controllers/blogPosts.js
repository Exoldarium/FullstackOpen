const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

blogRouter.get('/', async (req, res) => {
  const blog = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blog);
});

blogRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    next(err);
  }
});

blogRouter.post('/', middleware.getUser, async (req, res, next) => {
  const body = req.body;
  const user = req.user;

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    blogs: body.blogs,
    user: user.id
  });

  try {
    const blogRes = await newBlog.save();

    user.blogs = user.blogs.concat(blogRes._id);
    await user.save();

    res.status(201).json(blogRes);
  } catch (err) {
    next(err);
  }

});

blogRouter.put('/:id', async (req, res, next) => {
  const { likes, author, title, url } = req.body;
  const user = req.user;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        likes,
        author,
        title,
        url,
        user
      },
      { new: true, runValidators: true, context: 'query' }
    );

    res.json(updatedBlog);
  } catch (err) {
    next(err);
  }
});

blogRouter.delete('/:id', middleware.getUser, async (req, res) => {
  const user = req.user;
  const blog = await Blog.findById(req.params.id);

  // blog.user and user._id are objects so convert them to strings in order to compare them
  if (blog.user.toString() !== user._id.toString()) {
    return res.status(400).json({ error: 'you can only delete blogs you created' });
  } else {
    await blog.deleteOne();
    res.status(204).end();
  }
});

module.exports = blogRouter;