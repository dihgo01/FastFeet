const Sequelize = require('sequelize');
const config = require('../config/database');

const User = require('../model/User')

const db = new Sequelize(config);

 User.init(db);

module.exports= db;