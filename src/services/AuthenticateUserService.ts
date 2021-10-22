import { getCustomRepository } from "typeorm";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UsersRepository } from "../repositories/UsersRepository";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepository);
    
    // Verificar se email existe
    const user = await usersRepository.findOne({email});

    if(!user)
      throw new Error("Email/Password incorrect");

    // Verificar se a senha está correta
    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) 
      throw new Error("Email/Password incorrect");

    // Gerar o token
    const token = sign(
      {
        email: user.email
      }, 
      'c97e2b57a6c44cb28aa98211dad2811f',
      {
        subject: user.id,
        expiresIn: "1d"
      }
    );

    return token;
  }

}

export { AuthenticateUserService }