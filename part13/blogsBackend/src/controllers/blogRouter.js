const express = require('express');
const blogRouter = express.Router();

const Blog = require('../models/blogSchema');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

blogRouter.get('/:id', async (req, res) => {
  try {
    const singleBlog = await Blog.findByPk(req.params.id);
    res.json(singleBlog);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ error });
  }
});

blogRouter.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const blog = await Blog.create(req.body);

    res.json(blog);
    res.sendStatus(200);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

blogRouter.put('/:id', async (req, res) => {
  const { url, author, title, likes } = req.body;

  try {
    const blogToUpdate = await Blog.findByPk(req.params.id);
    blogToUpdate.set({
      ...blogToUpdate,
      url,
      author,
      title,
      likes
    })

    await blogToUpdate.save();
    res.json(blogToUpdate);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ error });
  }
});

blogRouter.delete('/:id', async (req, res) => {
  try {
    await Blog.destroy({
      where: {
        id: req.params.id
      }
    });

    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = blogRouter;