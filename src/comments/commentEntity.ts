import { postEntity } from "src/post/postEntity";
import { User } from "src/user/userEntity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class comments{
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id', 
    })
    comment_id: number

    @Column({
        nullable: false,
        default: '',
    })
    comment: string;

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    created_by: Date;

    @ManyToOne(type => User, user => user, {
        eager: true
    })
    @JoinColumn({ name: 'user_id' })
    id: number;

    @ManyToOne(type => postEntity, post => post, {
        eager: true
    })
    @JoinColumn({ name: 'post_id' })
    post_id : number;
}