import { User } from "src/user/userEntity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class postEntity{

    @PrimaryGeneratedColumn()
    post_id: number;

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    image : string

    @Column()
    category: string

    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    created_by: Date;

    @ManyToOne(type => User, user => user, {
        eager: true
    })
    @JoinColumn({ name: 'user_id' })
    id: number;
}