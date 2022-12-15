import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Generated } from 'typeorm';
import { ListEntity } from './ListEntity';
import { UserRole } from '../helpers/enum/enum-roles';
import { GuestEntity } from './GuestEntity';
import { CommnentEntity } from './CommentEntity';

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

    @Column('uuid')
    @Generated('uuid')
    userToken: string

    @OneToMany(
        () => ListEntity,
        ( list ) => list.user,
        {lazy: true}
    )
    list: ListEntity;

    @OneToMany(
        () => GuestEntity,
        ( guest ) => guest.user,
        {lazy: true}
    )
    guest: GuestEntity;

    @OneToMany(
        () => CommnentEntity,
        (comment) => comment.user,
        {lazy:true} 
    )
    comment:CommnentEntity


}