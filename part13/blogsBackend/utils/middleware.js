const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');
const { User, Blog, Session, Blacklist } = require('../src/models');
const { Op } = require('sequelize');

const errorHandler = (error, res, req, next) => {
  console.error(error);

  if (error.name = 'SequelizeValidationError') {
    return res.status(400).send({ error });
  }

  next(error);
}

const userFinder = async (req, res, next) => {
  let where = {};

  // filter readings based on read value
  if (req.query.read) {
    where = {
      read: { [Op.eq]: req.query.read }
    }
  }

  req.oneUser = await User.findByPk(req.params.id, {
    attributes: ['name', 'username'],
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
      through: {
        attributes: ['read', 'id'],
        where
      }
    },
  });
  next();
};

const tokenExtractor = async (req, res, next) => {
  const auth = req.get('authorization');

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    req.token = auth.substring(7);

    next();
    return;
  }

  next();
  return null;
}

const getUser = async (req, res, next) => {
  // check if the user is blacklisted
  const checkBlacklist = await Blacklist.findOne({
    where: {
      token: req.token
    }
  });

  // if they are deny access
  if (checkBlacklist) {
    return res.status(405).json({ error: 'Permission required' });
  }

  const decodedToken = jwt.verify(req.token, SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'invalid token' });
  }

  const user = await User.findByPk(decodedToken.id);
  const session = await Session.findOne({
    where: {
      userId: decodedToken.id
    }
  });
  req.user = user;
  req.session = session;
  next();
  return;
}

module.exports = {
  errorHandler,
  tokenExtractor,
  getUser,
  userFinder,
}