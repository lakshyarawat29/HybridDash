const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.sql');

const Template = sequelize.define(
  'Template',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    config: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: 'templates',
    timestamps: true,
  }
);

module.exports = Template;
