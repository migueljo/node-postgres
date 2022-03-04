const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { config } = require('../config/config')
const sendEmail = require('../utils/sendEmail')
const UserService = require('./user.service')

const userService = new UserService()

class AuthService {
  async getUser(email, password) {
    const user = await userService.findByEmail(email)
    if (!user) {
      throw boom.unauthorized()
    }
    const validPassword = await bcrypt.compare(password, user.password)

    if (validPassword) {
      delete user.dataValues.password
    } else {
      throw boom.unauthorized()
    }

    return user
  }

  signToken(user, options = {}) {
    const token = jwt.sign({ sub: user.id, role: user.role }, config.jwtSecret, options)
    return token
  }

  async recoverPassword(email) {
    const user = await userService.findByEmail(email)
    if (!user) throw boom.unauthorized()

    const recoveryToken = this.signToken(user, { expiresIn: '15min' })
    const link = `http://myfrontend.com/recovery?token=${recoveryToken}`

    await userService.update(user.id, { recoveryToken })

    const result = await sendEmail(user.email, {
      body: {
        html: `<b>Ingresa a este link para recuperar la contraseña => ${link}</b>`,
      },
      subject: 'Email para recuperar contraseña',
    })
    return result
  }

  async changePassword(newPassword, token) {
    try {
      const payload = jwt.verify(token, config.jwtSecret)
      const user = await userService.findOne(payload.sub)
      console.log({  })

      if (user.dataValues.recoveryToken !== token) throw boom.unauthorized();

      const hashedPassword = await bcrypt.hash(newPassword, 10)
      await userService.update(user.id, { recoveryToken: null, password: hashedPassword })

      return { message: 'Password has been changed' }
    } catch (error) {
      console.error(error)
      throw boom.unauthorized()
    }
  }
}

module.exports = AuthService
