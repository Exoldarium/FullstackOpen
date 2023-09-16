const { getUser } = require('../../utils/middleware');
const { Reading, User, Blog } = require('../models');

const readingListRouter = require('express').Router();

const readingListFinder = async (req, res, next) => {
  req.reading = await Reading.findByPk(req.params.id);
  next();
}

readingListRouter.post('/', getUser, async (req, res, next) => {
  const { blogId, userId } = req.body;
  const user = req.user;
  const session = req.session;

  if (!session) {
    return res.status(400).json({ error: "must be logged in to do this" });
  }

  try {
    const user = await User.findByPk(userId);
    const blog = await Blog.findByPk(blogId);

    if (!user || !blog) {
      return res.status(400).json({ error: 'blog or user not found ' });
    }

    const readingList = await Reading.create({
      userId: user.id,
      blogId: blog.id
    });

    res.status(201).json(readingList);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

readingListRouter.put('/:id', getUser, readingListFinder, async (req, res, next) => {
  const { read } = req.body;
  const user = req.user;
  const session = req.session;

  if (!session) {
    return res.status(400).json({ error: "must be logged in to do this" });
  }

  try {
    const reading = await Reading.findByPk(req.params.id);

    // the user can change only readings they own
    if (user.id !== reading.userId) {
      return res.status(400).json({ error: 'Permission required' });
    }

    req.reading.set({
      read
    });

    await req.reading.save();
    res.status(201).json(req.reading);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = readingListRouter;