const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');

const errorHandler = (error, res, req, next) => {
  console.error(error);

  if (error.name = 'SequelizeValidationError') {
    return res.status(400).send({ error });
  }

  next(error);
}

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization');

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(auth.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: 'token invalid' });
    }
  } else {
    return res.status(401).json({ error: 'token missing' });
  }

  next();
}

module.exports = {
  errorHandler,
  tokenExtractor
}