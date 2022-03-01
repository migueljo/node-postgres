const boom = require('@hapi/boom');

const sequelize = require('../libs/sequelize')

class CustomerService {
  async create(data) {
    const newCustomer = await sequelize.models.Customer.create(data, {
      include: ['user']
    })
    return newCustomer;
  }

  async find() {
    const customers = await sequelize.models.Customer.findAll({
      include: ['user']
    })
    return customers
  }

  async findOne(id) {
    const customer = await sequelize.models.Customer.findOne({ where: { id } })
    if (!customer) throw boom.notFound('Customer not found');

    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const customerUpdated = await customer.update(changes);

    return customerUpdated;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();

    return {id};
  }
}

module.exports = CustomerService;
