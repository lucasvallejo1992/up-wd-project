import { CONFIG } from "./config";
import { connectToMongoDB } from "./services/mongo";
import App from "./app";
import UserController from "./controllers/user.controller";
import CharacterController from "./controllers/character.controller";
import OptionController from "./controllers/options.controller";

const { SERVER_PORT } = CONFIG;

connectToMongoDB().catch(error => console.log(error));

const app = new App(
  [
    new UserController(),
    new OptionController(),
    new CharacterController()
  ],
  SERVER_PORT,
);

app.listen();
