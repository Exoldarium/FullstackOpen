const express = require('express');
const blogRouter = express.Router();

const { Blog } = require('../models');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);

    res.json(blog);
    res.sendStatus(200);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

blogRouter.get('/:id', blogFinder, async (req, res, next) => {
  try {
    res.json(req.blog);
    res.sendStatus(200);
  } catch (error) {
    next(err);
  }
});

blogRouter.put('/:id', blogFinder, async (req, res, next) => {
  const { url, author, title, likes } = req.body;

  try {
    req.blog.set({
      url,
      author,
      title,
      likes
    })

    await req.blog.save();
    res.json(req.blog);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete('/:id', blogFinder, async (req, res) => {
  try {
    await req.blog.destroy();

    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = blogRouter;