class UsersController {
  constructor(User, AuthService) {
    this.User = User;
    this.AuthService = AuthService;
  }

  async create(req, res) {
    const user = new this.User(req.body);

    try {
      await user.save();
      res.status(201).send(user);
    } catch (err) {
      res.status(422).send(err.message);
    }
  }

  async authenticate(req, res) {
    const authService = new this.AuthService(this.User);
    const user = await authService.authenticate(req.body);
    if (!user) {
      return res.sendStatus(401);
    }
    const token = this.AuthService.generateToken({
      username: user.username,
      password: user.password,
      role: user.role
    });
    return res.send({ token });
  }
}

export default UsersController;
