import express from 'express';
import { User } from '../models/user.model';

class UserController {
  public path = '/users';
  public router = express.Router();
 
  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.get(this.path, this.getUser);
    this.router.post(this.path, this.createUser);
  }
 
  getUser = async (req: express.Request, res: express.Response) => {
    const existingUser = await User.findOne();

    if (!existingUser) {
      return res.status(404).send({ message: 'NOT_FOUND' });
    }

    return res.json(existingUser);
  }
 
  createUser = async (req: express.Request, res: express.Response) => {
    const { name } = req.params;

    if (!name) {
      return res.status(400).send({ message: 'BAD_REQUEST' });;
    }

    const existingUser = await User.findOne();

    if (!existingUser) {
      const user = new User({ name });
      await user.save();
      return res.status(201).send(user);
    }

    return res.status(400).send({ message: 'ALREADY_CREATED' });
  }
}

export default UserController;
