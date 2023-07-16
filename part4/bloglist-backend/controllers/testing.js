const testingRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

// define a test route that we will use to reset our testing database
testingRouter.post('/reset', async (req, res) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  res.status(204).end();
});

module.exports = testingRouter;