import { followerList } from 'src/follower_list/followerListEntity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id',
    })
    id: number;

    @Column({
        nullable: false,
        default: '',
    })
    username: string;

    @Column({
        name: 'email_address',
        nullable: false,
        default: '',
    })
    email: string;

    @Column({
        nullable: false,
        default: '',
    })
    password: string;

    @Column({
        nullable: false,
        default: '',
    })
    role: string;

    @Column({
        nullable: true,
        default: '',
    })
    token: string;

    @OneToMany(type => followerList, follower => follower.user)
    followers: followerList[];

    @OneToMany(type => followerList, follower => follower.followee)
    followees: followerList[];
}