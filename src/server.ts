import 'reflect-metadata';
import express, { Request, Response, NextFunction, response } from 'express';
import 'express-async-errors';

import { router } from './routes';

import "./database";

const app = express();

app.use(express.json()); // Indica que irá trabalhar com json
app.use(router); // faz o middleware das routes
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof Error) {
    return res.status(400).json({
      error: err.message
    });
  }


  return res.status(500).json({
    error: "Internal server error"
  })
}); // middleware para erros

app.listen(3000, () => console.log('server is running'))