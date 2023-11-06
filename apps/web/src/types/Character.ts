import { ItemType } from "./Item";

export type CharacterType = {
  id: string;
  name: string;
  description: string;
  items: ItemType[];
}