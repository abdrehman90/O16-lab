import { User } from "src/user/userEntity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class followerList{
    @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
})
follow_id: number;

@ManyToOne(type => User, user => user.followers, {
    eager: true
})
@JoinColumn({ name: 'user_id' })
user: User;

@ManyToOne(type => User, user => user.followees, {
    eager: true
})
@JoinColumn({ name: 'follow_id' })
followee: User;

}