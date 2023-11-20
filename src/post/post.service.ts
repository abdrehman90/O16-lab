import { Injectable, UseInterceptors } from '@nestjs/common';
import { postEntity } from './postEntity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createPostDto } from 'src/dto/createPostDto';
import { responseError, responseSuccess } from 'src/response/response';
import { User } from 'src/user/userEntity';

@Injectable()
export class PostService {
    constructor(
    @InjectRepository(postEntity)
        private readonly postRepository: Repository<postEntity>,
        @InjectRepository(User)private userRepository:Repository<User>,
     ) { }

    
     // post create service
     async postCreate(createPostDto: createPostDto){
        const response = await this.postRepository.save(createPostDto)
        return response
        
     }

     // post update service
     async updatePost(post_id: number, createPostDto: createPostDto){
        var response = null
        const currentPost = await this.postRepository.findOneOrFail({ where: { post_id: post_id } });
        if (createPostDto.title) {
            currentPost.title = createPostDto.title;
          }if (createPostDto.description) {
            currentPost.description = createPostDto.description;
          }if (createPostDto.category) {
            currentPost.category = createPostDto.category;
          }if (createPostDto.image) {
            currentPost.image = createPostDto.image;
          }
          response = await this.postRepository.save(currentPost)
          return response
     }

     // post delete service
     async deletPost(post_id: number){
      const response = await this.postRepository.delete({post_id: post_id})
      return response

     }

     // post get service
     async getpost(){
        var response = null
        response = await this.postRepository.find()
        return response
     }

     // post get post by post id service
     async getPostId(post_id: number){
        var response = null
        response = await this.postRepository.findOne({where:({post_id: post_id})})
        return response
     }

     async getPostByUserId(id: number){
        var getFollowId = await this.postRepository.find({where:({id: id})})
        console.log(getFollowId);
        return getFollowId
    }
}
