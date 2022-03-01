'use strict'

const {CUSTOMER_TABLE, CustomerSchema} = require('../models/customer.model')

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema)
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable(CUSTOMER_TABLE)
  }
}
