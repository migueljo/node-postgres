// Register strategies middleware
require('../utils/auth')

const express = require('express')
const passport = require('passport')

const AuthService = require('../services/auth.service')

const router = express.Router()
const authService = new AuthService()

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = await req.user
      const token = authService.signToken(user)

      res.json({ user, token })
    } catch (error) {
      next(error)
    }
  }
)

router.post('/recovery-password',
  async (req, res, next) => {
    try {
      const { email } = req.body
      await authService.recoverPassword(email)

      res.json({ message: 'Email has been sent successfully' })
    } catch (error) {
      next(error)
    }
  }
)

router.post('/change-password',
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body
      const result = await authService.changePassword(newPassword, token)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
