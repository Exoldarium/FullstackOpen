const logger = require('./logger');

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

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'bad id' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  next(err);
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}