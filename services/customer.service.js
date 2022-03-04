const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const sequelize = require('../libs/sequelize')

class CustomerService {
  async create(data) {
    const hashedPassword = await bcrypt.hash(data.user.password, 10)
    const customerData = {
      ...data,
      user: {
        ...data.user,
        password: hashedPassword,
      }
    }

    const newCustomer = await sequelize.models.Customer.create(customerData, {
      include: ['user']
    })

    delete newCustomer.dataValues.user.dataValues.password

    return newCustomer
  }

  async find() {
    const customers = await sequelize.models.Customer.findAll({
      include: [{
        association: 'user',
        attributes: { exclude: ['password'] }
      }],
    })
    return customers
  }

  async findOne(id) {
    const customer = await sequelize.models.Customer.findOne({ where: { id } })
    if (!customer) throw boom.notFound('Customer not found')

    return customer
  }

  async update(id, changes) {
    const customer = await this.findOne(id)
    const customerUpdated = await customer.update(changes)

    return customerUpdated
  }

  async delete(id) {
    const customer = await this.findOne(id)
    await customer.destroy()

    return {id}
  }
}

module.exports = CustomerService
