import { Module } from '@nestjs/common';
import { FollowerListController } from './follower_list.controller';
import { FollowerListService } from './follower_list.service';
import { followerList } from './followerListEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/userEntity';
import { PostService } from 'src/post/post.service';
import { postEntity } from 'src/post/postEntity';
import { CommentsService } from 'src/comments/comments.service';
import { comments } from 'src/comments/commentEntity';


@Module({
  imports:[TypeOrmModule.forFeature([followerList, User, postEntity, comments]),],
  controllers: [FollowerListController],
  providers: [FollowerListService, UserService, PostService, CommentsService]
})
export class FollowerListModule {}
