import { CONFIG } from "./config";
import { connectToMongoDB } from "./services/mongo";
import App from "./app";
import UserController from "./controllers/user.controller";

const { SERVER_PORT } = CONFIG;

connectToMongoDB().catch(error => console.log(error));

const app = new App(
  [
    new UserController(),
  ],
  SERVER_PORT,
);

app.listen();
