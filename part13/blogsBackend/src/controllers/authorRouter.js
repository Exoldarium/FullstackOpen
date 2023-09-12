const express = require('express');
const authorRouter = express.Router();

const { Blog, User } = require('../models');
const { sequelize } = require('../../utils/db');

authorRouter.get('/', async (req, res, next) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        'author',
        [sequelize.fn('COUNT', sequelize.col('title')), 'articles'],
        [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
        // { order: ['likes', 'DESC'] }
      ],
      order: [['likes', 'ASC']],
      group: 'author'
    });

    res.status(200).json(authors);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = authorRouter;