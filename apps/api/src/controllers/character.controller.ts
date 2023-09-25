import express from 'express';
import { User } from '../models/user.model';
import { Character } from '../types/character.type';
import { Item } from '../types/item.type';
import { CHARACTERS } from '../constants/characters';

class CharacterController {
  public path = '/characters';
  public router = express.Router();
 
  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.get(this.path, this.getCharacters);
    this.router.get(`${this.path}/:id`, this.getCharacter);
    this.router.post(this.path, this.createCharacter);
    this.router.patch(`${this.path}/:id`, this.updateCharacter);
  }
 
  getCharacters = async (req: express.Request, res: express.Response) => {
    const existingUser = await User.findOne();

    if (!existingUser) {
      return res.status(404).send({ message: 'NOT_FOUND' });
    }

    return res.json(existingUser.characters);
  }

  getCharacter = async (req: express.Request<{ id: string }>, res: express.Response) => {
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
  }
 
  createCharacter = async (req: express.Request<{id: string}>, res: express.Response) => {
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
  }

  updateCharacter = async (req: express.Request<{ id: string, items: string[] }>, res: express.Response) => {
    const { id } = req.params;
    const { items } = req.body;

    if (!items) {
      return res.status(400).send({ message: 'BAD_REQUEST' });;
    }

    const existingUser = await User.findOne();

    if (!existingUser) {
      return res.status(404).send({ message: 'NOT_FOUND' });
    }

    const existingCharacter: Character = existingUser.characters.filter(character => character.id === id)?.[0];

    if (!existingCharacter) {
      return res.status(404).send({ message: 'NOT_FOUND' });
    }

    return res.status(200).send(existingCharacter);
  }
}

export default CharacterController;
