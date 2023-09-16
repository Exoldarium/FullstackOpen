const { DataTypes } = require('sequelize');

const { sequelize } = require('../../utils/db');

const Token = sequelize.define('token', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'token'
});

module.exports = Token;