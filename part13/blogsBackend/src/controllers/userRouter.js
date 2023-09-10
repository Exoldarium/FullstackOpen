const userRouter = require('express').Router();

const { User, Blog } = require('../models');

const userFinder = async (req, res, next) => {
  req.user = await User.findByPk(req.params.id);
  next();
};

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog
      }
    });

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);

    res.status(200).json(user);
  } catch (error) {
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

module.exports = userRouter;