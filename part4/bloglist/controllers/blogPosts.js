const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res) => {
  const blog = await Blog.find({});
  res.json(blog);
});

blogRouter.post('/', async (req, res) => {
  const body = req.body;

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    blogs: body.blogs
  });

  const blogRes = await newBlog.save();

  res.status(201).json(blogRes);
});

blogRouter.get('/:id', async (req, res) => {
  const blogToDelete = await Blog.findById(req.params.id);

  if (blogToDelete) {
    res.json(blogToDelete);
  } else {
    res.status(404).end();
  }
});

blogRouter.put('/:id', async (req, res) => {
  const { likes } = req.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { likes: likes },
    { new: true, runValidators: true, context: 'query' }
  );

  res.json(updatedBlog);
});

blogRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

module.exports = blogRouter;