import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


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

}