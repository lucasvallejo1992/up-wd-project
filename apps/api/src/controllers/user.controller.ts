import express, { Request, Response, Router } from 'express';
import { User } from '../models/user.model';
import { log } from 'logger';

class UserController {
  public path = '/user';
  public router = Router();
 
  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.get(this.path, this.getUser);
    this.router.post(this.path, this.createUser);
  }
 
  getUser = async (req: Request, res: Response) => {
    try {
      const existingUser = await User.findOne();
  
      if (!existingUser) {
        return res.status(404).send({ message: 'NOT_FOUND' });
      }
  
      return res.json(existingUser);
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
        const user = new User({ name });
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
