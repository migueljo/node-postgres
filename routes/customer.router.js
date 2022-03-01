const express = require('express')

const CustomerService = require('../services/customer.service')
const validatorHandler = require('../middlewares/validator.handler')
const { getCustomerSchema, createCustomerSchema, updateCustomerSchema } = require('../schemas/customer.schema')

const router = express.Router()

const customerService = new CustomerService()

// /api/v1/customers/
router.get('/', async (req, res, next) => {
  try {
    const customers = await customerService.find()
    res.json(customers)
  } catch (error) {
    next(error)
  }
})

router.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const customer = await customerService.findOne(req.params.id)
      res.json(customer)
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const newCustomer = await customerService.create(req.body)
      res.status(201).json(newCustomer)
    } catch (error) {
      next(error)
    }
  }
)

router.patch(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const updatedCustomer = await customerService.update(req.params.id, req.body)
      res.json(updatedCustomer);
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const deletedCustomer = await customerService.delete(req.params.id)
      res.json(deletedCustomer)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
