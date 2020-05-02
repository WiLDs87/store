import request from 'supertest';
import setupApp from '../../src/app';
import Product from '../../src/app/models/product';
import User from '../../src/app/models/user';
import AuthService from '../../src/app/services/auth'

let app;
let authToken;

const adminUser = {
  username: 'admin',
  password: 'admin123',
  role: 'admin'
};
const expectedAdminUser = {
  _id: '3f0aa479e3b9a374592795aa',
  username: 'admin',
  role: 'admin'
};

beforeAll(async () => {
  app = await setupApp();
  const user = new User(adminUser);
  user._id = '3f0aa479e3b9a374592795aa';
  await User.deleteMany({});
  await user.save();

  authToken = AuthService.generateToken(expectedAdminUser);
});

afterAll(async () => {
  await app.database.connection.close();
});

describe("Product Routes", () => {

  const defaultId = 'b9d73a180135695628fae149';
  const defaultProduct = {
    name: 'Default product',
    description: 'Default description',
    price: 100
  };
  const expectedProduct = {
    __v: 0,
    _id: defaultId,
    name: 'Default product',
    description: 'Default description',
    price: 100
  };

  afterEach(async () => await Product.deleteMany());

  beforeEach(async () => {
    await Product.deleteMany();

    const product = new Product(defaultProduct);
    product._id = defaultId;
    return await product.save();
  });

  describe('GET /products', () => {
    it('should return a list of products', done => {
      request(app)
        .get('/products')
        .set({ 'x-access-token': authToken })
        .end((err, res) => {
          expect(res.body).toStrictEqual([expectedProduct]);
          done(err);
        });
    });

    it('should return a list of products that name have product', done => {
      request(app)
        .get('/products')
        .send({ name: 'product'})
        .set({ 'x-access-token': authToken })
        .end((err, res) => {
          expect(res.body).toStrictEqual([expectedProduct]);
          done(err);
        });
    });

    it('should return 200 with one product', done => {
      request(app)
        .get(`/products/${defaultId}`)
        .set({ 'x-access-token': authToken })
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body).toStrictEqual([expectedProduct]);
          done(err);
        });
    });

  });

  describe('POST /products', () => {

    it('should return a new product with statuscode 201', done => {

      const customId = '4a9d9234e5b678c617c59e2b';

      const newProduct = Object.assign(
        {},
        { _id: customId, __v: 0 },
        defaultProduct
      );

      const expectedProduct = {
        __v: 0,
        _id: customId,
        name: 'Default product',
        description: 'Default description',
        price: 100
      };

      request(app)
        .post('/products')
        .set({ 'x-access-token': authToken })
        .send(newProduct)
        .end((err, res) => {
          expect(res.statusCode).toBe(201);
          expect(res.body).toStrictEqual(expectedProduct);
          done(err);
        });


    });
  });

  describe('PUT /products/:id', () => {

    it('should update the product and return 200 as statuscode', done => {

      const editedProduct = {
        name: 'edited name'
      };
      const product = Object.assign({}, editedProduct, defaultProduct);

      request(app)
        .put(`/products/${defaultId}`)
        .set({ 'x-access-token': authToken })
        .send(product)
        .end((err, res) => {
          expect(res.status).toBe(200);
          done(err);
        });
    });
  });

  describe('DELETE /products/:id', () => {

    it('should delete a product and return 204 as statuscode', done => {
      request(app)
        .delete(`/products/${defaultId}`)
        .set({ 'x-access-token': authToken })
        .end((err, res) => {
          expect(res.status).toBe(204);
          done(err);
        });
    });

  });


});