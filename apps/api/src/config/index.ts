export const CONFIG = {
  MONGO_DB_CONNECTION_STRING: process.env.MONGO_DB_CONNECTION_STRING || 'mongodb://localhost:27017/app',
  SERVER_PORT: process.env.PORT || '3001',
};
