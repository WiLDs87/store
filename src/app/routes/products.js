import express from 'express';
import { check } from 'express-validator';
import ProductsController from '../controllers/products';
import Product from '../models/product';

const router = express.Router();
const productsController = new ProductsController(Product);

router.get('/:id', (req, res) => productsController.getById(req, res));
router.put('/:id', (req, res) => productsController.update(req, res));
router.delete('/:id', (req, res) => productsController.remove(req, res));

router.get(
  '/',
  [
    check('skip')
      .optional()
      .isNumeric()
      .withMessage('Must be numeric'),
    check('limit')
      .optional()
      .isNumeric()
      .withMessage('Must be numeric')
  ],
  (req, res) => productsController.get(req, res)
);

router.post(
  '/',
  [
    check('name')
      .isString()
      .withMessage('Must be string')
      .isLength({ min: 3 })
      .withMessage('Must be at least 3 chars long'),
    check('price')
      .isNumeric()
      .withMessage('Must be numeric')
  ],
  (req, res) => productsController.create(req, res)
);

export default router;
