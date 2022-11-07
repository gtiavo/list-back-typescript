import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity({name: 'list'})
export class ListEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique: true
    })
    title: string;

    @Column('text')
    instructions: string;

    @Column('text')
    description: string;

    @Column('text')
    category: string;


    @ManyToOne(
        () => UserEntity,
        ( user ) => user.list,
        { eager: true, nullable: false, lazy: true }
    )
    user: UserEntity;

    @CreateDateColumn()
    createAt: Date
    @UpdateDateColumn()
    updateAt: Date
    @DeleteDateColumn()
    deleteAt: Date



}