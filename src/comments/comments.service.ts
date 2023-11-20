import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { comments } from './commentEntity';
import { Repository } from 'typeorm';
import { createCommentsDto } from 'src/dto/createCommnets';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(comments)private commentRepository: Repository<comments>){}


    async createComment(createCommentsDto: comments): Promise<comments> {
        return this.commentRepository.save(createCommentsDto);
      }
    async getComment(){
        var response = null
        response = await this.commentRepository.find()
        return response
    }
    async getCommentByPostId(post_id: number){
        var response = null
        response = await this.commentRepository.find({where:({post_id: post_id})})
        return response
    }
}
