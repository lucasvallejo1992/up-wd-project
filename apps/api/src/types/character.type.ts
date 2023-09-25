import { Item } from "./item.type"

export type Character = {
  id: string,
  name: string,
  description: string,
  items: Item[]
};
