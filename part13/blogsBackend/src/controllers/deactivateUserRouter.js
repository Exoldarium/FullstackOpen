const deactivateUserRouter = require('express').Router();

const { getUser, userFinder } = require('../../utils/middleware');
const { Blacklist, User, Token } = require('../models');

deactivateUserRouter.put('/:id', getUser, async (req, res, next) => {
  const user = req.user;
  const session = req.session;
  const { id } = req.params;

  console.log(user.admin)

  if (!session || !user.admin) {
    return res.status(400).json({ error: "permission required" });
  }

  try {
    // find the user we want to deactivate
    const findUser = await User.findByPk(id, {
      attributes: ['id', 'disabled']
    });
    // find their token
    const findToken = await Token.findOne({
      where: {
        userId: id,
      }
    });
    // deactivate the user
    findUser.set({
      disabled: req.body.disabled
    });
    console.log(JSON.stringify(findUser))

    // create a blacklist with the deactivated user's token
    await Blacklist.create({
      id: findUser.id,
      token: findToken.token
    });

    // log out deactivated user
    await session.destroy({
      where: {
        userId: findUser.id
      }
    });

    await findUser.save();
    res.status(201).json(req.oneUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = deactivateUserRouter;