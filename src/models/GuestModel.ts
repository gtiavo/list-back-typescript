import { Repository } from "typeorm";
import { GuestEntity } from '../entities/GuestEntity';
import { AppDataSource } from '../database/data-source';
import { UserModel } from './UserModel';
import { UserEntity } from '../entities/UserEntity';
import { NotFoundResponse, BadRequestResponse } from '../_HTTP-response/errors/client-error-responses';


export class GuestModel {

    private readonly guestRepository: Repository<GuestEntity> = AppDataSource.getRepository(GuestEntity);
    private readonly userModels: UserModel = new UserModel();


    async createRelations(idUserParams: any, user: UserEntity):Promise<GuestEntity> {
        
        const {guestUser, userToken, fullName} = await this.findOneRelation(idUserParams, user);
        if(guestUser) throw new BadRequestResponse('This relationship already exists');


        const guestRelation = this.guestRepository.create({guestUserName:fullName,guestUserToken:userToken, user: user});
        return this.guestRepository.save(guestRelation);

    }

    async deleteUserRelations(idUserParams: any, user: UserEntity) {
        
        const {guestUser} = await this.findOneRelation(idUserParams, user);
        if(!guestUser) throw new BadRequestResponse('this relationship does not exist');

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
    
        const {userToken, fullName} = await this.userModels.findOne(idUserParams);
        if(userToken === user.userToken ) throw new BadRequestResponse("Can't create this relationship");

        const guestUser = await this.guestRepository.findOne({where:{ guestUserToken: userToken, user:{id: user.id} }});
        return {userToken, guestUser, fullName}
    }

    async getGuestUsers(user: UserEntity):Promise<GuestEntity[]> {
        return this.guestRepository.find({where:{guestUserToken: user.userToken}});
    }

    async guestUserComment(userComment: UserEntity, userList:UserEntity) {
        let userGuestOrList:GuestEntity;
        userGuestOrList = await this.guestRepository.findOne({where:{guestUserToken: userComment.userToken, user:{id:userList.id}}});
        if(!userGuestOrList) userGuestOrList = await this.guestRepository.findOne({where:{user:{id: userComment.id}}});
        if(!userGuestOrList) throw new NotFoundResponse('guest user not found');

        return userGuestOrList;
    }



}