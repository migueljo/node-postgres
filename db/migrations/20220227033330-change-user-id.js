'use strict';

const { DataTypes } = require('sequelize');
const {CUSTOMER_TABLE} = require('../models/customer.model')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      unique: true,
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'user_id',
    });
  },
  async down (queryInterface, Sequelize) {
    //
  }
};
