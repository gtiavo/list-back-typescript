import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./UserEntity";
import { CommnentEntity } from './CommentEntity';

@Entity({name: 'list'})
export class ListEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    title: string;

    @Column('text')
    instructions: string;

    @Column('text')
    description: string;

    @Column('text')
    category: string;

    @CreateDateColumn()
    createAt: Date
    @UpdateDateColumn()
    updateAt: Date
    @DeleteDateColumn()
    deleteAt: Date

    @ManyToOne(
        () => UserEntity,
        ( user ) => user.list,
        { eager: true, nullable: false, lazy: true }
    )
    user: UserEntity;

    @OneToMany(
        () => CommnentEntity,
        (comment) => comment.list,
        {lazy: true}
    )
    comment: CommnentEntity;


}