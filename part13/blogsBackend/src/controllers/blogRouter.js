const express = require('express');
const blogRouter = express.Router();

const { Blog, User } = require('../models');
const { tokenExtractor } = require('../../utils/middleware');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  });
  res.json(blogs);
});

blogRouter.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({
      ...req.body,
      // sequelize will automatically create userId from user_id in postgres for us when we define relationships in our schema
      // as we have defined a one-to-many relationship of user to blogs userId is created here
      // we can also create it manualy but that is not necessary
      userId: user.id
    });

    console.log(JSON.stringify(user));
    console.log(JSON.stringify(blog));

    res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

blogRouter.get('/:id', blogFinder, async (req, res, next) => {
  try {
    res.status(200).json(req.blog);
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
    });

    await req.blog.save();
    res.status(201).json(req.blog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = req.blog;

    if (user.id !== blog.userId) {
      return res.status(400).json({ error: "Permission required" });
    }

    await req.blog.destroy();
    res.status(204);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = blogRouter;