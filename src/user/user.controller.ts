import {
    Body,
    Controller,
    Get,
    Param,
    UseGuards,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/CreateUserDto';
import { authService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport'
import { UserData, responseError, responseSuccess } from 'src/response/response';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor
        (
            private readonly userService: UserService,
            private authService: authService,
        ) { }

      @Get()
      async getUsers() {
        var response = null
        response = await this.userService.getUser();
        return new responseSuccess(200,'All User Found SuccessFully',response)
      }

      @Get('id/:id')
      async findUsersById(@Param('id') id: number) {
        var response = null
        response = await this.userService.getUsers(id);
        return new responseSuccess(200,'User Found SuccessFully',response)
      }

    //user create controller
    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true }))
    createUsers(@Body() createUserDto: CreateUserDto) {
        const token = this.authService.generateToken(createUserDto);
        createUserDto.token = token
        return this.userService.createUser(createUserDto);
    }
    // user login controller 
    @Post('login')
    async loginUser(@Body() createUserDto: CreateUserDto, @Body() userData: UserData) {
        if (createUserDto.email === '' || createUserDto.password === '') {
            return new responseError(0, 'Email and password should not be empty');
        }

        const check = await this.userService.loginUser(createUserDto);

        if (check === null) {
            return new responseError(0, 'Email/Password not exists');
        } else {
            return new responseSuccess(200, 'LOGIN SUCCESSFULLY', check);
        }
    }
}
