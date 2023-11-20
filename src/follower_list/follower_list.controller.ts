import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FollowerListService } from './follower_list.service';
import { followerList } from './followerListEntity';
import { responseError, responseSuccess } from 'src/response/response';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';
import { CommentsService } from 'src/comments/comments.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('follower-list')
@Controller('follower-list')
export class FollowerListController {
    constructor(private followerService: FollowerListService,
        private userService: UserService,
        private postService: PostService,
        private commentsService: CommentsService) { }

        // create follow User Cntroller 
        @Post('create')
        async createFollower(@Body() _body: followerList) {
            try {
                if (!_body.user) {
                    throw new responseError(400, 'User Id Should Not Be Empty');
                }
        
                if (!_body.followee) {
                    throw new responseError(400, 'Follower Id Should Not Be Empty');
                }
        
                const getUserId = await this.userService.getUsers(_body.user.id);
                const getFollowerId = await this.userService.getUsers(_body.followee.id);
        
                if (!getUserId) {
                    throw new responseError(400, 'User Id Not Exist');
                }
        
                if (!getFollowerId) {
                    throw new responseError(400, 'Follower Id Not Exist');
                }
        
                const response = await this.followerService.createFollower(_body);
        
                if (response !== null) {
                    return new responseSuccess(200, 'Following Successfully', response);
                }
            } catch (error) {
                if (error instanceof responseError) {
                    return error; 
                } else {
                    console.error('Unexpected error:', error);
                    return new responseError(500, 'All Field Are Requird');
                }
            }
        }
        

    // get feeds by follow user id 
    @Get('feedByFollowerId/:id')
    async getFeeds(@Param('id') id: number) {
        try {
            var getUsers = await this.userService.getUsers(id)
            if(getUsers == null){
                return new responseError(400,'User Id Not Exist')
            }
            const getFeeds = await this.followerService.getFollowerId(id);
            const userFeeds = await this.postService.getpost();
            const feed = getFeeds.map(post => {
                const media = userFeeds.filter(p => p.id.id === post.followee.id);
                if (media.length > 0) {
                    const combinedMediaArray = media.map(m => ({
                        image: m.image,
                        title: m.title,
                        description: m.description,
                        category: m.category,
                        created_by: m.created_by,
                        post_Id: m.post_id,
                    }));
                    return {
                        username: post.user.username,
                        email: post.user.email,
                        role: post.user.role,
                        media: combinedMediaArray,
                    };
                } else {
                    return {
                        username: post.user.username,
                        email: post.user.email,
                        role: post.user.role,
                        media: [],
                    };
                }
            });
    
            return new responseSuccess(200, 'News Feeds', feed);
        } catch (error) {
            // Handle errors and return an appropriate response
            console.error('Error in getFeeds:', error);
            return new responseError(500, 'Internal Server Error');
        }
    }
    






}
