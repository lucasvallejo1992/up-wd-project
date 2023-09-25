import express from 'express';
import { ITEMS } from '../constants/items';
import { ItemType } from '../types/item.type';

class UsersController {
  public path = '/options';
  public router = express.Router();
 
  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.get(`${this.path}/items`, this.getItems);
    // this.router.post(`${this.path}/items`, this.createUser);
  }
 
  getItems = async (req: express.Request<{type?: ItemType}>, res: express.Response) => {
    const { type } = req.query;

    if (!type) {
      return res.json(ITEMS);
    }

    return res.json(ITEMS.filter(item => item.type === type));
  }
}

export default UsersController;
