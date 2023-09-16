const userRouter = require('express').Router();

const { User, Blog, Session } = require('../models');
const { getUser, userFinder } = require('../../utils/middleware');

const usernameFinder = async (req, res, next) => {
  req.username = await User.findOne({ username: req.params.username });
  next();
};

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
        attributes: { exclude: ['userId'] },
      },
      include: {
        model: Session,
        attributes: ['active']
      }
    });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userRouter.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userRouter.get('/:id', userFinder, async (req, res, next) => {
  try {
    const { username, name, blogs } = req.oneUser;

    res.status(200).json({
      username,
      name,
      readings: blogs
    });
  } catch (error) {
    next(error);
  }
});

userRouter.put('/:username', getUser, usernameFinder, async (req, res, next) => {
  const { username } = req.body;
  const user = req.user;
  const session = req.session;

  if (!session) {
    return res.status(400).json({ error: "must be logged in to do this" });
  }

  if (user.username !== req.username) {
    return res.status(400).json({ error: 'Permission required' });
  }

  try {
    req.username.set({
      username
    });

    await req.username.save();
    res.status(201).json(req.username);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;