import mongoose from 'mongoose';

const characterLimit = (array: []) => array.length <= 5;

export const UserSchema = new mongoose.Schema({
  name: String,
  pin: String,
  characters: { type : [] , default : [], validate: [characterLimit, 'CHARACTER_LIMIT_EXEDED'] }
});
