import mongoose from "mongoose";
import { UserSchema } from "../schemas/user.schema";

export const User = mongoose.model('User', UserSchema);
