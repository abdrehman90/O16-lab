import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { createPostDto } from 'src/dto/createPostDto';
import { responseError, responseSuccess } from 'src/response/response';
import { UserService } from 'src/user/user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Post')
@Controller('post')
export class PostController {
    constructor(private postService: PostService,
        private userService: UserService) { }


    // post create controller
    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true }))
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
    ], {
        storage: diskStorage({
            destination: './src/image',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    }))
    async postCreate(
        @UploadedFiles() file,
        @Body() createPostDto: createPostDto,
    ) {
        try {
            const getUser = await this.userService.getUsers(createPostDto.id);

            if (file?.image) {
                const imageFile = file.image[0];
                const imageExt = extname(imageFile.originalname).toLowerCase();
                const allowedImageExtensions = ['.jpg', '.jpeg', '.png'];

                if (!allowedImageExtensions.includes(imageExt)) {
                    throw new responseError(400, 'Invalid image file. Only JPG, JPEG, and PNG files are allowed.');
                }

                createPostDto.image = imageFile.filename;
            } else {
                createPostDto.image = null;
            }

            if (!createPostDto.title) {
                throw new responseError(400, 'Title Should Not Be Empty');
            } else if (!createPostDto.description) {
                throw new responseError(400, 'Description Should Not Be Empty');
            } else if (!createPostDto.category) {
                throw new responseError(400, 'Category Should Not Be Empty');
            } else if (!createPostDto.image) {
                throw new responseError(400, 'Image Should Not Be Empty');
            } else if (!createPostDto.id) {
                throw new responseError(400, 'User Id Should Not Be Empty');
            } else if (!getUser) {
                throw new responseError(400, 'User Id Not Exist');
            }

            const response = await this.postService.postCreate(createPostDto);

            if (response !== null) {
                return new responseSuccess(200, 'Post Created Successfully', response);
            } else {
                throw new responseError(400, 'Post Not Create');
            }
        } catch (error) {
            if (error instanceof responseError) {
                return error;
            } else {
                return new responseError(500, 'Internal Server Error');
            }
        }
    }


    // post update controller
    @Put('postUpdateByPostId/:post_id')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
    ], {
        storage: diskStorage({
            destination: './src/image',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    }))
    async updatePost(
        @Param('post_id') post_id: number,
        @Body() createPostDto: createPostDto,
        @UploadedFiles() file,
    ) {
        try {
            var getPostIds = null
            getPostIds = await this.postService.getPostId(post_id)
            if (getPostIds == null) {
                return new responseError(400, 'Post Id Not Exist')
            }
            const getPostId = await this.postService.getPostId(post_id);

            if (file?.image) {
                const imageFile = file.image[0];
                const imageExt = extname(imageFile.originalname).toLowerCase();
                const allowedImageExtensions = ['.jpg', '.jpeg', '.png'];

                if (!allowedImageExtensions.includes(imageExt)) {
                    throw new responseError(400, 'Invalid image file. Only JPG, JPEG, and PNG files are allowed.');
                }

                createPostDto.image = imageFile.filename;
            } else {
                createPostDto.image = null;
            }

            if (!createPostDto.title) {
                throw new responseError(400, 'Title Should Not Be Empty');
            } else if (!createPostDto.description) {
                throw new responseError(400, 'Description Should Not Be Empty');
            } else if (!createPostDto.category) {
                throw new responseError(400, 'Category Should Not Be Empty');
            } else if (!createPostDto.image) {
                throw new responseError(400, 'Image Should Not Be Empty');
            } else if (!getPostId) {
                throw new responseError(400, 'Post Id Not Exist');
            }

            const response = await this.postService.updatePost(post_id, createPostDto);

            if (response !== null) {
                return new responseSuccess(200, 'Post Update Successfully', response);
            } else {
                throw new responseError(400, 'Post Not Update');
            }
        } catch (error) {
            if (error instanceof responseError) {
                return error;
            } else {
                return new responseError(500, 'Internal Server Error');
            }
        }
    }


    // post delet controller
    @Delete('postDeletByPostId/:post_id')
    async deletPost(@Param('post_id') post_id: number) {
        try {
            var getPostId = null
            getPostId = await this.postService.getPostId(post_id)
            if (getPostId == null) {
                return new responseError(400, 'Post Id Not Exist')
            }
            const response = await this.postService.deletPost(post_id);

            if (response !== null) {
                return new responseSuccess(200, 'Post Deleted Successfully', response);
            } else {
                throw new responseError(400, 'Post Not Deleted');
            }
        } catch (error) {
            console.error('Error in deletPost:', error);
            if (error instanceof responseError) {
                return error;
            } else {
                return new responseError(500, 'Internal Server Error');
            }
        }
    }


    // post get controller 
    @Get()
    async getAllPost() {
        try {
            const response = await this.postService.getpost();

            if (response !== null) {
                return new responseSuccess(200, 'All Posts Found Successfully', response);
            } else {
                throw new responseError(404, 'No Posts Found');
            }
        } catch (error) {
            console.error('Error in getAllPost:', error);
            if (error instanceof responseError) {
                return error;
            } else {
                return new responseError(500, 'Internal Server Error');
            }
        }
    }

}
