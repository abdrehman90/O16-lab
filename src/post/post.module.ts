import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { postEntity } from './postEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/userEntity';
import { UserService } from 'src/user/user.service';


@Module({
  imports: [TypeOrmModule.forFeature([postEntity, User]),],
  controllers: [PostController],
  providers: [PostService,UserService]
})
export class PostModule {}
