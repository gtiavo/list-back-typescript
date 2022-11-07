import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ListEntity } from './ListEntity';
import { UserRole } from '../helpers/enum/enum-roles';

@Entity({name: "users"})
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("text")
    fullName: string;

    @Column("text", {
        unique: true
    })
    email: string;

    @Column("text", {
        select: false
    })
    password: string;

    @Column("boolean", {
        default: true
    })
    isActive: boolean;

    @Column('enum', {
        enum: UserRole ,
        default: UserRole.USER
    })
    roles: UserRole

    @OneToMany(
        () => ListEntity,
        ( list ) => list.user,
        {lazy: true}
    )
    list: ListEntity;


}