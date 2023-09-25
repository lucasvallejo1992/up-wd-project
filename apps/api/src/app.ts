import express, { Router } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { log } from 'logger';

type Controller = {
  router: Router;
};

class App {
  public app: express.Application;
  public port: string;
 
  constructor(controllers: any[], port: string) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  private initializeMiddlewares() {
    this.app.disable('x-powered-by')
    this.app.use(morgan('dev'))
    this.app.use(urlencoded({ extended: true }))
    this.app.use(json())
    this.app.use(cors())
    this.app.use(bodyParser.json());
  }
 
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller: Controller) => {
      this.app.use('/', controller.router);
    });
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      log(`App listening on the port ${this.port}`);
    });
  }
}
 
export default App;
