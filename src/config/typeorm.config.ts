import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { comments } from "src/comments/commentEntity"
import { followerList } from "src/follower_list/followerListEntity"
import { postEntity } from "src/post/postEntity"
import { User } from "src/user/userEntity"

export const typeOrmConfig: TypeOrmModuleOptions ={

        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '12345',
        database: 'test',
        entities: [User,postEntity,followerList, comments],
        synchronize: true,
}

