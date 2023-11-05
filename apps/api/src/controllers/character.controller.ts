import express, { Request, Response, Router } from 'express';
import { User } from '../models/user.model';
import { Character } from '../types/character.type';
import { Item } from '../types/item.type';
import { CHARACTERS } from '../constants/characters';
import { ITEMS } from '../constants/items';
import { log } from 'console';
import { AuthMiddleware } from '../middlewares/auth.middleware';

class CharacterController {
  public path = '/characters';
  public router = Router();
 
  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.get(this.path, [AuthMiddleware.authenticate, this.getCharacters]);
    this.router.get(`${this.path}/:id`, [AuthMiddleware.authenticate, this.getCharacter]);
    this.router.post(this.path, [AuthMiddleware.authenticate, this.createCharacter]);
    this.router.patch(`${this.path}/:id`, [AuthMiddleware.authenticate, this.updateCharacter]);
  }
 
  getCharacters = async (req: Request, res: Response) => {
    try {
      const existingUser = await User.findOne();
  
      if (!existingUser) {
        return res.status(404).send({ message: 'NOT_FOUND' });
      }
  
      return res.json(existingUser.characters);
    } catch (error: any) {
      log(error);
      return res.status(500).send({ message: 'SERVER_ERROR' });
    }
  }

  getCharacter = async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;
      const existingUser = await User.findOne();
  
      if (!existingUser) {
        return res.status(404).send({ message: 'NOT_FOUND' });
      }
  
      const character: Character = existingUser.characters.filter(character => character.id === id)?.[0];
  
      if (!character) {
        return res.status(404).send({ message: 'NOT_FOUND' });
      }
  
      return res.json(character);
    } catch (error: any) {
      log(error);
      return res.status(500).send({ message: 'SERVER_ERROR' });
    }
  }
 
  createCharacter = async (req: Request<{id: string}>, res: Response) => {
    try {
      const { id } = req.body;
  
      if (!id) {
        return res.status(400).send({ message: 'BAD_REQUEST' });
      }
  
      const existingUser = await User.findOne();
  
      if (!existingUser) {
        return res.status(404).send({ message: 'NOT_FOUND' });
      }
  
      const existingCharacter: Character = existingUser.characters.find(character => character.id === id);
  
      const character: Character | undefined = CHARACTERS.find(character => character.id === id);
  
      if (!existingCharacter && character) {
        existingUser.characters = [ ...existingUser.characters, character];
  
        existingUser.save();
  
        return res.status(201).send({ message: 'CREATED' });
      }
  
      return res.status(400).send({ message: !character ? 'OPTION_NOT_FOUND' : 'ALREADY_CREATED' });
    } catch (error: any) {
      log(error);
      return res.status(500).send({ message: 'SERVER_ERROR' });
    }
  }

  updateCharacter = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { items } = req.body;
      console.log(items);
      if (!items || items.length > 3) {
        return res.status(400).send({ message: 'BAD_REQUEST' });;
      }
  
      const existingUser = await User.findOne();
  
      if (!existingUser) {
        return res.status(404).send({ message: 'NOT_FOUND' });
      }
  
      const existingCharacter: Character = existingUser.characters.find(character => character.id === id);
  
      if (!existingCharacter) {
        return res.status(404).send({ message: 'NOT_FOUND' });
      }
  
      const typeValidationObject = {
        'shirt': 0,
        'pants': 0,
        'shoes': 0
      }
  
      const selectedItems: Item[] = items.map((item: string) => {
        const selectedItem = ITEMS.find(option => option.id === item);
  
        if (!selectedItem) {
          return res.status(404).send({ message: `${item} NOT_FOUND` });
        }
  
        typeValidationObject[selectedItem.type] += 1;
  
        if (typeValidationObject[selectedItem.type] > 1) {
          return res.status(400).send({ message: `${item} DUPLICATED_TYPE` });
        }
  
        return selectedItem;
      });
  
      existingUser.characters = existingUser.characters.map(character => character.id === id ? ({...character, items: selectedItems}) : character);
  
      existingUser.save();
  
      return res.status(200).send(selectedItems);
    } catch (error: any) {
      log(error);
      return res.status(500).send({ message: 'SERVER_ERROR' });
    }
  }
}

export default CharacterController;
