const { DataTypes } = require('sequelize');

const { sequelize } = require('../../utils/db');

const Blacklist = sequelize.define('blacklist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  token: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'blacklist'
});

module.exports = Blacklist;