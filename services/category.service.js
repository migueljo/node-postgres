const boom = require('@hapi/boom');

const sequelize = require('../libs/sequelize')

class CategoryService {
  async create(data) {
    const newCategory = await sequelize.models.Category.create(data)
    return newCategory;
  }

  async find() {
    const categories = await sequelize.models.Category.findAll({ include: ['products'] })
    return categories
  }

  async findOne(id) {
    const category = await sequelize.models.Category.findOne({
      where: { id },
      include: ['products']
    })

    if (!category) throw boom.notFound("Category not found")

    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id)
    await category.update(changes)

    return category;
  }

  async delete(id) {
    const category = await this.findOne(id)
    await category.destroy()
    return { id }
  }
}

module.exports = CategoryService;
