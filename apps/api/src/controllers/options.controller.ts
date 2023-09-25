import express from 'express';
import { ITEMS } from '../constants/items';
import { ItemType } from '../types/item.type';
import { CHARACTERS } from '../constants/characters';

class OptionController {
  public path = '/options';
  public router = express.Router();
 
  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.get(`${this.path}/items`, this.getItems);
    this.router.get(`${this.path}/characters`, this.getCharacters);
  }
 
  getItems = async (req: express.Request<{type?: ItemType}>, res: express.Response) => {
    const { type } = req.query;

    if (!type) {
      return res.json(ITEMS);
    }

    return res.json(ITEMS.filter(item => item.type === type));
  }

  getCharacters = async (req: express.Request, res: express.Response) => {
    return res.json(CHARACTERS);
  }
}

export default OptionController;
