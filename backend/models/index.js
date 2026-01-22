const sequelize = require('../config/database');
const Role = require('./role');
const User = require('./user');
const Product = require('./product');

module.exports = {
  sequelize,
  Role,
  User,
  Product
};