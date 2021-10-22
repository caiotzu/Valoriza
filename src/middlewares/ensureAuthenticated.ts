import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';


interface IPayload {
  sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  // Receber o token
  const authToken = req.headers.authorization;

  // Validar se token está preenchido 
  if(!authToken)
    return res.status(401).end();

  const [, token] = authToken.split(' ');

  try {
    // Validar se o token é válido
    const { sub } = verify(token, "c97e2b57a6c44cb28aa98211dad2811f") as IPayload;

    // Recuperar informações do usuário
    req.user_id = sub;

    return next();

  } catch(err) {
    return res.status(401).end();
  }
}