import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { UserEntity } from './UserEntity';
import { GuestUserRole } from '../helpers/enum/enum-roles';


@Entity({name: 'guests'})
export class GuestEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    guestUserName: string;

    @Column('enum', {
        enum: GuestUserRole,
        default: GuestUserRole.USER 
    })
    guestUserRole: GuestUserRole;
    
    @Column('uuid')
    guestUserToken: string

    @ManyToOne(
        () => UserEntity,
        ( user ) => user.guest,
        { eager: true, nullable: false, lazy: true }
    )
    user: UserEntity;

}