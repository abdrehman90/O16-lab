import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { followerList } from './followerListEntity';
import { Repository } from 'typeorm';

@Injectable()
export class FollowerListService {
    constructor(@InjectRepository(followerList)private followListRepository: Repository<followerList>){}

    async createFollower(_body: followerList){
        const response = await this.followListRepository.save(_body)
        return response
    }

        async getFollowerId(id: number){
            var getFollowId = await this.followListRepository.find({
                where: { user: { id: id } }, 
            });
            return getFollowId;
        }
        
}
