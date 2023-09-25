import express, { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { log } from 'logger';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { CONFIG } from '../config';
import bcrypt from 'bcrypt';

class UserController {
  public path = '/user';
  public router = Router();
 
  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.get(this.path, [AuthMiddleware.authenticate, this.getUser]);
    this.router.post(`${this.path}/authenticate`, this.authenticate);
    this.router.post(this.path, this.createUser);
  }
 
  getUser = async (req: Request, res: Response) => {
    try {
      const existingUser = await User.findOne().select('-pin');

      if (!existingUser) {
        return res.status(404).send({ message: 'NOT_FOUND' });
      }
  
      return res.json(existingUser);
    } catch (error: any) {
      log(error);
      return res.status(500).send({ message: 'SERVER_ERROR' });
    }
  }

  authenticate = async (req: Request<{ pin: string }>, res: Response) => {
    try {
      const { pin } = req.body;

      if (!pin) {
        return res.status(400).send({ message: 'BAD_REQUEST' });
      }
  
      const existingUser = await User.findOne();

      if (!existingUser) {
        return res.status(404).send({ message: 'PIN_DONT_MATCH' });
      }

      const matches = await bcrypt.compare(pin, existingUser.pin || '');

      if (!matches) {
        return res.status(404).send({ message: 'PIN_DONT_MATCH' });
      }

      const token = jwt.sign({}, CONFIG.JWT_KEY, {
        expiresIn: CONFIG.JWT_EXPIRATION_TIME
      });
  
      return res.status(200).send({ token });
    } catch (error: any) {
      log(error);
      return res.status(500).send({ message: 'SERVER_ERROR' });
    }
  }
 
  createUser = async (req: Request, res: Response) => {
    try {
      const { name, pin } = req.body;
  
      if (!name || !pin) {
        return res.status(400).send({ message: 'BAD_REQUEST' });;
      }
  
      const existingUser = await User.findOne();
  
      if (!existingUser) {
        const encriptedPin = await bcrypt.hash(pin, 10);
        const user = new User({ name, pin: encriptedPin });
        await user.save();
        return res.status(201).send(user);
      }
  
      return res.status(400).send({ message: 'ALREADY_CREATED' });
    } catch (error: any) {
      log(error);
      return res.status(500).send({ message: 'SERVER_ERROR' });
    }
  }
}

export default UserController;
