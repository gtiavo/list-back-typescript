import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from './UserEntity';
import { ListEntity } from './ListEntity';


@Entity({name: 'comments'})
export class CommnentEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    message: string;

    @CreateDateColumn()
    createAt: Date
    @UpdateDateColumn()
    updateAt: Date
    @DeleteDateColumn()
    deleteAt: Date

    @ManyToOne(
        () => UserEntity,
        (user) => user.comment,
        {lazy: true, eager:true}
        )
    user:UserEntity;

    @ManyToOne( 
        () => ListEntity,
        ( list ) => list.comment,
        {lazy:true}
         )
    list: ListEntity;

}