import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { UserEntity } from './UserEntity';


@Entity({name: 'guests'})
export class GuestEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string

    
    @Column('uuid')
    guestUserToken: string

    @ManyToOne(
        () => UserEntity,
        ( user ) => user.guest,
        { eager: true, nullable: false, lazy: true }
    )
    user: UserEntity;

}