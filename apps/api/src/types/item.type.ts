export type ItemType = 'upper-body' | 'lower-body' | 'boots';

export type Item = {
  id: string,
  name: string,
  description: string,
  src: string,
  type: ItemType
};
