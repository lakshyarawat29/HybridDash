const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.sql');
const User = require('./user.model');

const Dashboard = sequelize.define(
  'Dashboard',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    config: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: 'dashboards',
    timestamps: true,
  }
);

Dashboard.belongsTo(User, { foreignKey: 'userId', as: 'owner' });
User.hasMany(Dashboard, { foreignKey: 'userId', as: 'dashboards' });

module.exports = Dashboard;
