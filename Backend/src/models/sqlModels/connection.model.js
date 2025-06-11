const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.sql');
const User = require('./user.model');

const Connection = sequelize.define(
  'Connection',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM('sql', 'nosql'),
      allowNull: false,
    },
    dbType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    config: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'connections',
    timestamps: true,
  }
);

Connection.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Connection, { foreignKey: 'userId', as: 'connections' });

module.exports = Connection;
