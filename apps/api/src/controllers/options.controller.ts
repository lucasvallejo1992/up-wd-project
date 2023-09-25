import express, { Request, Response, Router } from 'express';
import { ITEMS } from '../constants/items';
import { ItemType } from '../types/item.type';
import { CHARACTERS } from '../constants/characters';
import { log } from 'logger';

class OptionController {
  public path = '/options';
  public router = Router();
 
  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.get(`${this.path}/items`, this.getItems);
    this.router.get(`${this.path}/characters`, this.getCharacters);
  }
 
  getItems = async (req: Request<{type?: ItemType}>, res: Response) => {
    try {
      const { type } = req.query;
  
      if (!type) {
        return res.json(ITEMS);
      }
  
      return res.json(ITEMS.filter(item => item.type === type));
    } catch (error: any) {
      log(error);
      return res.status(500).send({ message: 'SERVER_ERROR' });
    }
  }

  getCharacters = async (req: Request, res: Response) => {
    return res.json(CHARACTERS);
  }
}

export default OptionController;
