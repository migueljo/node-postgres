const express = require('express');

const validatorHandler = require('./../middlewares/validator.handler');
const OrderService = require('../services/order.service');
const { createOrderSchema, getOrderSchema, addItemSchema } = require('../schemas/order.schema');

const router = express.Router();
const orderService = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    const order = await orderService.find();
    res.json(order);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const category = await orderService.findOne(req.params.id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const newOrder = await orderService.create(req.body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const newItem = await orderService.addItem(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

// router.patch('/:id',
//   validatorHandler(getCategorySchema, 'params'),
//   validatorHandler(updateCategorySchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       const category = await service.update(id, body);
//       res.json(category);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.delete('/:id',
//   validatorHandler(getCategorySchema, 'params'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       await service.delete(id);
//       res.status(201).json({id});
//     } catch (error) {
//       next(error);
//     }
//   }
// );

module.exports = router;
