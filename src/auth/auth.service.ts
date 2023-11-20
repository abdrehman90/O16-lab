import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from "src/dto/CreateUserDto";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';


@Injectable()
export class authService {
    constructor
    (
        private readonly jwtService: JwtService,
        private userService: UserService
    ) { }


    generateToken(payload: CreateUserDto) {
        const jwtPayload = {payload};
        return this.jwtService.sign(jwtPayload);
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.getemail(email); // Replace with a method that finds the user by email in your UserService
        if (user && (await bcrypt.compare(password, user.password))) {
          return user;
        }
        return null;
      }
}