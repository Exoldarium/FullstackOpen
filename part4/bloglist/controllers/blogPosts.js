const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (req, res) => {
  const blog = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blog);
});

blogRouter.post('/', async (req, res, next) => {
  const body = req.body;

  const user = await User.findById(body.userId);

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    blogs: body.blogs,
    user: user.id
  });

  console.log(user.blogs);
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
  const { likes } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { likes: likes },
      { new: true, runValidators: true, context: 'query' }
    );

    res.json(updatedBlog);
  } catch (err) {
    next(err);
  }
});

blogRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

module.exports = blogRouter;