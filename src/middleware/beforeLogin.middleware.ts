import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class BeforeLogin implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    let token = "";
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader) {
      if (authorizationHeader.startsWith('Bearer ')) {
        token = authorizationHeader.substring(7);
      }
    }

    const envToken = process.env.API_TOKEN;

    if (envToken !== token) {
      const errorResponse = {
        status: 400,
        message: "Not Login",
        tok: token
      }
      res.json(errorResponse);

    }
    next();
  }
}
