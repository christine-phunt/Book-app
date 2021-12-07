const Sequelize = require('sequelize');
const db = require('../util/database');

const Book = db.define('users',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false
  },
  year: {
    type: Sequelize.INT,
    allowNull: false,
  },
  iSBN: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INT,
    allowNull: false,
  },
});

module.exports = User;

