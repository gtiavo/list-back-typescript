import { Repository } from "typeorm";
import { GuestEntity } from '../entities/GuestEntity';
import { AppDataSource } from '../database/data-source';
import { FieldsValidate } from '../helpers/FieldsValidate';
import { UserModel } from './UserModel';
import { UserEntity } from '../entities/UserEntity';
import { NotFoundResponse, BadRequestResponse } from '../_HTTP-response/errors/client-error-responses';


export class GuestModel {

    private readonly guestRepository: Repository<GuestEntity> = AppDataSource.getRepository(GuestEntity);
    private readonly  fieldsValidate:FieldsValidate = new FieldsValidate();
    private readonly userModels: UserModel = new UserModel();


    async createRelations(idUserParams: any, user: UserEntity):Promise<GuestEntity> {
        
        const {guestUser, userToken} = await this.findOneRelation(idUserParams, user);
        if(guestUser) throw new BadRequestResponse('ya existe esta relacion');

        const guestRelation = this.guestRepository.create({ guestUserToken:userToken, user: user});
        return this.guestRepository.save(guestRelation);

    }

    async deleteUserRelations(idUserParams: any, user: UserEntity) {
        
        const {guestUser} = await this.findOneRelation(idUserParams, user);
        if(!guestUser) throw new BadRequestResponse('esta relacion no existe');

        return this.guestRepository.delete({user:{id: user.id}});
        
    }

    async deleteGuestUserRelations( idUserParams:any, user: UserEntity){
        await this.findGuestUser(idUserParams, user);
        return this.guestRepository.delete({guestUserToken: user.userToken, user:{id: idUserParams.idUserParams}});
    }

    async findGuestUser({idUserParams}: any, {userToken}: UserEntity):Promise<GuestEntity> {

        const guestUser = await this.guestRepository.findOne({where:{guestUserToken:userToken,user:{id: idUserParams}}});
        if(!guestUser) throw new NotFoundResponse('guest user not found');

        return guestUser;
    }

    async findOneRelation(idUserParams: any, user: UserEntity){
    
        const {userToken} = await this.userModels.findOne(idUserParams);
        if(userToken === user.userToken ) throw new BadRequestResponse('No se puede crear esta relacion');

        const guestUser = await this.guestRepository.findOne({where:{ guestUserToken: userToken, user:{id: user.id} }});
        return {userToken, guestUser}
    }

    async getGuestUsers(user: UserEntity):Promise<GuestEntity[]> {
        return this.guestRepository.find({where:{guestUserToken: user.userToken}});
    }



}