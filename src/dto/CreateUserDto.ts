import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
  username: string;
  password: string;
  email: string;
  role: string;
  token: string;
  
}