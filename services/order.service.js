const boom = require('@hapi/boom');

const sequelize = require('../libs/sequelize')

class OrderService {
  async create(data) {
    const order = await sequelize.models.Order.create(data)
    return order
  }

  async addItem(data) {
    const newItem = await sequelize.models.OrderProduct.create(data)
    return newItem
  }

  async find() {
    const orders = await sequelize.models.Order.findAll()
    return orders;
  }

  async findOne(id) {
    const order = await sequelize.models.Order.findByPk(id, {
      include: [
        { association: 'customer', include: ['user'] },
        'items'
      ]
    })

    if (!order) throw boom.notFound("Order not found")

    return order;
  }

  async findByUser(userId) {
    const orders = await sequelize.models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [{
        association: 'customer',
        include: ['user'],
      }]
    })

    return orders
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;
