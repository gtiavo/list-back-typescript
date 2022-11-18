import { Repository } from "typeorm";
import { validate as uuidValidate } from 'uuid';
import { AppDataSource } from '../database/data-source';
import { UserEntity } from '../entities/UserEntity';
import { NotFoundResponse } from '../_HTTP-response/errors/client-error-responses';
import { AuthUpdateDto } from '../dtos/auth';
import { FieldsValidate } from '../helpers/FieldsValidate';


export class UserModel {

    private readonly userRepository: Repository<UserEntity> = AppDataSource.getRepository(UserEntity);
    private readonly  fieldsValidate:FieldsValidate = new FieldsValidate();


    async find():Promise<UserEntity[]> {
        return this.userRepository.find({where:{isActive:true}});
    }

    async findOne( {idUserParams}: any ):Promise<UserEntity> {

        let user: UserEntity;

        if(uuidValidate(idUserParams)) user = await this.userRepository.findOne({where: {id: idUserParams, isActive: true}});

        if(!user) throw new NotFoundResponse('User not found');

        return user;

    }

    async update(idUserParams: any, {email, fullName, password }: AuthUpdateDto):Promise<UserEntity> {

       const {id} = await this.findOne(idUserParams);

       const userDto = new AuthUpdateDto(fullName, email, password);
       await this.fieldsValidate.validateOrReject(userDto);

       const userPreload = await this.userRepository.preload({id, ...userDto});

       return this.userRepository.save(userPreload);

    }

    async delete(idUserParams: any):Promise<void> {

       const user = await this.findOne(idUserParams);
       const userPreload = await this.userRepository.preload({id: user.id, isActive: false});
       this.userRepository.save(userPreload);

    }



}