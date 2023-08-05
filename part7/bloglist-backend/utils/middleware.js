const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const logger = require('./logger');
const User = require('../models/user');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
}

const getToken = (req, res, next) => {
  const auth = req.get('authorization');
  if (auth && auth.startsWith('Bearer ')) {
    // we remove Bearer from our string because we only need our token id
    const token = auth.replace('Bearer ', '');
    req.token = token;
    next();
    return;
  }
  next();
  return null;
}

const getUser = async (req, res, next) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, config.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'invalid token' });
  }

  const user = await User.findById(decodedToken.id);
  req.user = user;
  next();
  return;
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'bad id' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(400).json({ error: err.message });
  } else if (err.name === 'TokenExpiredError') {
    return res.status(400).json({ error: 'token expired' });
  }

  next(err);
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getToken,
  getUser,
}