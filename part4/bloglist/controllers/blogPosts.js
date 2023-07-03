const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res) => {
  const blog = await Blog.find({});
  res.json(blog);
});

blogRouter.post('/', async (req, res, next) => {
  const body = req.body;

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    blogs: body.blogs
  });

  try {
    const blogRes = await newBlog.save();
    res.status(201).json(blogRes);
  } catch (err) {
    next(err);
  }

});

blogRouter.get('/:id', async (req, res) => {
  const blogToDelete = await Blog.findById(req.params.id);

  if (blogToDelete) {
    res.json(blogToDelete);
  } else {
    res.status(404).end();
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