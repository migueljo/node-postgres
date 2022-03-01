'use strict';

const { ORDER_TABLE, OrderSchema } = require("../models/order.model");

module.exports = {
  async up (queryInterface, Sequelize) {
    const OrderSchemaClone = {...OrderSchema};
    delete OrderSchemaClone.total;

    await queryInterface.createTable(ORDER_TABLE, OrderSchema)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDER_TABLE)
  }
};
