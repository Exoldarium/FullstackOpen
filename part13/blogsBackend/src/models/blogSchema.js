const { DataTypes } = require('sequelize');

const { sequelize } = require('../../utils/db');

const Blog = sequelize.define('blog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    isAfter: 1991,
    isBefore: 2023,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
});
Blog.sync();

module.exports = Blog;