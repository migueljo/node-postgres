const { Sequelize } = require('sequelize');

const {config} = require('../config/config');
const setupModels = require('../db/models')

const sequelize = new Sequelize(config.dbUrl, {
  dialect: 'postgres',
  logging: !config.isProd,
  ssh: config.isProd ? {
    rejectUnauthorized: false,
  } : null
});

setupModels(sequelize);

module.exports = sequelize;
