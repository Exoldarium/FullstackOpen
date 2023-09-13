const userRouter = require('express').Router();

const { User, Blog } = require('../models');
const { tokenExtractor } = require('../../utils/middleware');

const userFinder = async (req, res, next) => {
  req.user = await User.findByPk(req.params.id);
  next();
};

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
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
});

userRouter.put('/:username', tokenExtractor, usernameFinder, async (req, res, next) => {
  const { username } = req.body;
  console.log(req.username)
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