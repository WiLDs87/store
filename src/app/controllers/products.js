import { validationResult } from 'express-validator';

class ProductsController {
  constructor(Product) {
    this.Product = Product;
  }

  async get(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      let name = '';
      let limit = '';
      let skip = '';

      if (req && req.body) {
        name = req.body.name;
        limit = req.body.limit;
        skip = req.body.skip;
      }

      const pagination = {
        skip: skip || 0,
        limit: limit || 100
      };

      const params = {};

      if (name) {
        params.name = { $regex: `.*${name}.*` };
      }

      const products = await this.Product.find(params, null, pagination);

      return res.send(products);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async getById(req, res) {
    try {
      const {
        params: { id }
      } = req;

      const product = await this.Product.find({ _id: id });
      res.send(product);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const product = new this.Product(req.body);

    try {
      await product.save();
      res.status(201).send(product);
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  async update(req, res) {
    try {
      await this.Product.updateOne({ _id: req.params.id }, req.body);
      res.sendStatus(200);
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  async remove(req, res) {
    try {
      await this.Product.deleteOne({ _id: req.params.id });
      res.sendStatus(204);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}

export default ProductsController;
