const sequelize = require('../config/db.sql');
const User = require('./user.model');
const Connection = require('./connection.model');
const Dashboard = require('./dashboard.model');
const Template = require('./template.model');

module.exports = {
  sequelize,
  User,
  Connection,
  Dashboard,
  Template,
};
