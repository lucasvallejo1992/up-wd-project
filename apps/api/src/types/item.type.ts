export type ItemType = 'shirt' | 'pants' | 'shoes';

export type Item = {
  id: string,
  name: string,
  description: string,
  src: string,
  type: ItemType
};
