import { Request, Response, NextFunction } from 'express';
import cors from 'cors';

class CorsMiddleware {
  private corsOptions: cors.CorsOptions;

  constructor(allowedOrigins: string[]) {
    this.corsOptions = {
      origin: allowedOrigins,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    };
    this.handle = this.handle.bind(this);
  }

  public handle(req: Request, res: Response, next: NextFunction) {
    cors(this.corsOptions)(req, res, next);
  }
}

export default CorsMiddleware;
