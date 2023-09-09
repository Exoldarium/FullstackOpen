const errorHandler = (error, res, req, next) => {
  console.error(error);

  if (error.name = 'SequelizeValidationError') {
    return res.status(400).send({ error });
  }

  next(error);
}

module.exports = {
  errorHandler,
}