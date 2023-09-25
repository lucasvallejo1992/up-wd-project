export type ItemType = 'upper_body' | 'lower_body' | 'boots';

export type Item = {
  id: string,
  name: string,
  description: string,
  src: string,
  type: ItemType
};
