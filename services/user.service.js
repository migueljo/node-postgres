const boom = require('@hapi/boom');

const sequelize = require('../libs/sequelize')

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await sequelize.models.User.create(data)
    return newUser;
  }

  async find() {
    const users = await sequelize.models.User.findAll({ include: ['customer'] });
    return users;
  }

  async findOne(id) {
    const user = await sequelize.models.User.findOne({ where: { id } })
    if (!user) throw boom.notFound('User not found');

    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const userUpdated = await user.update(changes);

    return userUpdated;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();

    return {id};
  }
}

module.exports = UserService;
