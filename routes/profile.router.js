// Register strategies middleware
require('../utils/auth')

const express = require('express')
const passport = require('passport')

const OrderService = require('../services/order.service')

const router = express.Router()
const orderService = new OrderService()

router.get('/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const orders = await orderService.findByUser(req.user.sub)

    res.json(orders)
  }
)

module.exports = router
