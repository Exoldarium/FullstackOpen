const { getUser } = require('../../utils/middleware');
const { Token } = require('../models');

const logoutRouter = require('express').Router();

logoutRouter.delete('/', getUser, async (req, res, next) => {
  const user = req.user;
  const session = req.session;

  if (!session) {
    return res.status(400).json({ error: "must be logged in to do this" });
  }

  try {
    await session.destroy({
      where: {
        userId: user.id
      }
    });
    await Token.destroy({
      where: {
        userId: user.id
      }
    });

    res.status(204).end();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = logoutRouter;