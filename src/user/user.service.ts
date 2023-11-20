import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/CreateUserDto';
import { Repository } from 'typeorm';
import { User } from './userEntity';
import * as bcrypt from 'bcrypt';
import { login, responseError, responseSuccess } from 'src/response/response';
import { encodepassword } from 'src/bcrypt/bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async getUser() {
        var response = null
        response = await this.userRepository.find()
        return response
    }

    // user create service
    async createUser(createUserDto: CreateUserDto) {
        var reg = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{3}$/,
            regexp = new RegExp(reg);
        var space = /^\S/,
            space = new RegExp(space)
        var response = null
        response = await this.userRepository.findOne({ where: { email: createUserDto.email } })
        if (createUserDto.username == '') {
            return (new responseError(400, 'Username should not be empty'))
        } else if (createUserDto.email == '') {
            return (new responseError(400, 'Email should not be empty'))
        } else if (createUserDto.password == '') {
            return (new responseError(400, 'Password should not be empty'))
        } else if (createUserDto.role == '') {
            return (new responseError(400, 'Role should not be empty'))
        } else if (!regexp.test(createUserDto.email)) {
            return (new responseError(400, 'You have entered an invalid email address!'))
        } else if (!space.test(createUserDto.username)) {
            return (new responseError(400, 'Only spaces are not allow in UserName'))
        } else if (response) {
            return (new responseError(400, 'Email Already Exists'))
        }
        const password = encodepassword(createUserDto.password)
        const newUser = this.userRepository.create({ ...createUserDto, password });
        const res = await this.userRepository.save(newUser);
        if (res !== null) {
            return new responseSuccess(200, 'User Create Succssfully', res)
        }
    }

    // user login service
    async loginUser(_body: login) {
        var response = null;
        response = await this.userRepository.findOne({ where: { email: _body.email } })
        if (response === null) {
            return null
        }
        else {
            const check = await bcrypt.compare(_body.password, response.password);
            console.log("-----" + check);
            if (check) {
                return response
            } else {
                return null;
            }
        }
    }

    // user get By User id service 
    async getUsers(id: number) {
        var getUser = null
        getUser = await this.userRepository.findOne({ where: ({ id: id }) })
        return getUser
    }
    // get user email service
    async getemail(email: string) {
        var response = null
        response = await this.userRepository.findOne({ where: { email: email } })
        return response;
    }

}