const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();

const { SECRET } = require('../../utils/config');
const { User } = require('../models');

loginRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        username
      }
    });

    const hardcodedPassword = password === 'secret';

    if (!(user && hardcodedPassword)) {
      return res.status(401).json({
        error: 'invalid username or password'
      });
    }

    const userToken = {
      username: user.username,
      id: user.id
    }

    const token = jwt.sign(userToken, SECRET);

    res
      .status(200)
      .send({
        token,
        username: user.username,
        name: user.name
      });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;