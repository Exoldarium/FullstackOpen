const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body;

  if (password.length < 3) {
    return res.status(400).json({ error: 'password must be at least 3 characters long' });
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash
    });

    const saveUser = await user.save();
    res.status(201).json(saveUser);
  } catch (err) {
    next(err);
  }
});

userRouter.get('/', async (req, res, next) => {
  try {
    const user = await User.find({}).populate(
      'blogs',
      {
        title: 1,
        author: 1,
        url: 1,
        likes: 1,
        blogs: 1
      }
    );

    res.json(user);
  } catch (err) {
    next(err);
  }
});

userRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;