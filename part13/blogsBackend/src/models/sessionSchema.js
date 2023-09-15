const { DataTypes } = require('sequelize');

const { sequelize } = require('../../utils/db');

const Session = sequelize.define('session', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'session'
});

module.exports = Session;