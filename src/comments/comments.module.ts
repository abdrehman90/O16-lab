import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postEntity } from 'src/post/postEntity';
import { User } from 'src/user/userEntity';
import { comments } from './commentEntity';
import { PostService } from 'src/post/post.service';
import { UserService } from 'src/user/user.service';


@Module({
  imports: [TypeOrmModule.forFeature([comments,postEntity, User]),],
  controllers: [CommentsController],
  providers: [CommentsService,PostService, UserService]
})
export class CommentsModule {}
