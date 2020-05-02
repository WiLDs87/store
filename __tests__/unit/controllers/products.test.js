import ProductsController from '../../../src/app/controllers/products';
import Product from '../../../src/app/models/product';

describe('Controller: Products', () => {

  const defaultProduct = [
    {
      __v: 0,
      _id: 'b9d73a180135695628fae149',
      name: 'product name',
      description: 'product description',
      price: 100
    }
  ];

  describe('get products', () => {

    it('should return a list of products', async () => {

      const req = {
        body: {}
      };

      const res = { send : jest.fn().mockReturnValue(defaultProduct)};
      Product.find = jest.fn().mockImplementation(defaultProduct => defaultProduct);

      const productsController = new ProductsController(Product);
      const response = await productsController.get(req, res);

      expect(response).toBe(defaultProduct);
    });

    it('should return a list of products passing filter', async () => {

      const req = {
        body: {
          name: 'name',
          limit: 2,
          skip: 1
        }
      }
      let res = { send : jest.fn().mockReturnValue(defaultProduct)};
      Product.find = jest.fn().mockImplementation(defaultProduct => defaultProduct);

      const productsController = new ProductsController(Product);
      const response = await productsController.get(req, res);

      expect(response).toBe(defaultProduct);
    });

  });

});
