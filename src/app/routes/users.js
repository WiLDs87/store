import express from 'express';
import UsersController from '../controllers/users';
import User from '../models/user';
import AuthService from '../services/auth';

const router = express.Router();
const usersController = new UsersController(User, AuthService);

router.post('/', (req, res) => usersController.create(req, res));
router.post('/authenticate', (req, res) =>
  usersController.authenticate(req, res)
);

export default router;
