const { DataTypes } = require('sequelize');

const { sequelize } = require('../../utils/db');

const Blog = sequelize.define('Blog', {
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
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
});
Blog.sync();

module.exports = Blog;