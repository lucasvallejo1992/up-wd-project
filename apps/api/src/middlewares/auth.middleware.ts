import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import { CONFIG } from '../config';
import { log } from 'console';

export const AuthMiddleware = {
  authenticate: (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    console.log(token);

    if (token && token !== 'null') {
      jwt.verify(token, CONFIG.JWT_KEY, (error: any) => {
        if (error) {
          log(error);
          return res.status(401).send({ message: 'TOKEN_EXPIRED' });
        }
        next();
      })
    } else {
      return res.status(401).send({ message: 'UNAUTHORIZED' });
    }
  }
};
