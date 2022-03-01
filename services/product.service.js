const boom = require('@hapi/boom');
const { Op } = require('sequelize')

const sequelize = require('../libs/sequelize');

class ProductsService {
  async create(data) {
    const newProduct = await sequelize.models.Product.create(data)
    return newProduct
  }

  async find({ limit = 10, offset = 0, price, priceMin, priceMax }) {
    const options = {
      include: ['category'],
      offset,
      limit,
    }

    if (price) options.where = { price }

    if (priceMin && priceMax) {
      options.where = { price: { [Op.between]: [priceMin, priceMax] } }
    }

    const products = await sequelize.models.Product.findAll(options)
    return products
  }

  async findOne(id) {
    const product = await sequelize.models.Product.findOne({
      where: { id },
      include: ['category']
    })

    if (!product) throw boom.notFound('product not found')
    if (product.isBlock) throw boom.conflict('product is block');

    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id)
    await product.update(changes)

    return product
  }

  async delete(id) {
    const product = await this.findOne(id)
    await product.destroy()

    return { id }
  }
}

module.exports = ProductsService;
