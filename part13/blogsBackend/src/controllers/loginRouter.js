const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();

const { SECRET } = require('../../utils/config');
const { User, Session, Token } = require('../models');

loginRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        username,
        disabled: false
      }
    });

    const session = await Session.findOne({
      where: {
        userId: user.id,
        active: true
      }
    });

    // check if the user is already logged in
    if (session) {
      return res.status(405).json({ error: 'Already logged in' });
    }

    await Session.create({
      userId: user.id,
      active: true,
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

    const token = jwt.sign(userToken, SECRET, { expiresIn: 43200 });

    await Token.create({
      userId: user.id,
      token
    });

    await user.save();

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