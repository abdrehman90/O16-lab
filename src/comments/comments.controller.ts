import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { createCommentsDto } from 'src/dto/createCommnets';
import { responseError, responseSuccess } from 'src/response/response';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';
import { comments } from './commentEntity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService,
        private userService: UserService,
        private postService: PostService){}


    @Post('create')
  async createComment(@Body() createCommentsDto: comments): Promise<any> {
    try {
      if (!createCommentsDto.comment) {
        return new responseError(400, 'Comment should not be empty');
      }
      const response = await this.commentsService.createComment(createCommentsDto);
      return new responseSuccess(200, 'Comment created successfully', response);
    } catch (error) {
    }
  }

  @Get('getCommentsByPostId/:post_id')
async getCommentsByPostId(@Param('post_id') post_id: number) {
    try {
        const getcomments = await this.commentsService.getCommentByPostId(post_id);
        const responseData = [];

        for (const comment of getcomments) {
            const data = {
                comments: comment.comment,
                created_at: comment.created_by,
                id: comment.id.id,
                username: comment.id.username,
                email: comment.id.email,
                password: comment.id.password,
                role: comment.id.role,
            };
            responseData.push(data);
            console.log(data);
        }

        return new responseSuccess(200, "Comments", responseData);
    } catch (error) {
        console.error('Error in getCommentsByPostId:', error);
        if (error instanceof responseError) {
            return error; 
        } else {
            return new responseError(500, 'Internal Server Error');
        }
    }
}

}
