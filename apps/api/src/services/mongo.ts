import mongoose from "mongoose";
import { CONFIG } from "../config";

export const connectToMongoDB = () => mongoose.connect(CONFIG.MONGO_DB_CONNECTION_STRING);
