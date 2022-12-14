import { Repository } from "typeorm";
import { AppDataSource } from '../database/data-source';
import { validate as uuidValidate } from 'uuid';
import { ListEntity } from '../entities';
import { FieldsValidate } from '../helpers';
import { ListCreateDto } from "../dtos/list";
import { NotFoundResponse } from "../_HTTP-response/errors";
import { ListUpdateDto } from '../dtos/list/ListUpdateDto';
import { UserEntity } from '../entities/UserEntity';
import { BadRequestResponse } from '../_HTTP-response/errors/client-error-responses';


export class ListModel {

    private readonly listRepository: Repository<ListEntity> = AppDataSource.getRepository(ListEntity);
    private readonly  fieldsValidate:FieldsValidate = new FieldsValidate();

    async create({instructions, title, category,description}: ListCreateDto, user:UserEntity ):Promise<ListEntity> {
        title = title.toLowerCase()
        
        const newList = new ListCreateDto(title, instructions, description, category );
        await this.fieldsValidate.validateOrReject(newList);

        const titleList = await this.listRepository.findOne({where: {title, user:{id: user.id}}});
        if(titleList) throw new BadRequestResponse('El titulo ya existe, prueba con otro');
        
        const createList = this.listRepository.create({
            ...newList,
            user: user
        })

        await this.listRepository.save(createList);

        return createList;

    }

    async getAll( { id }: UserEntity  ):Promise<ListEntity[]> {
        return await this.listRepository.find({where: { user:{ id } }});
    }

    async getOne({termParams}:any, idUser: UserEntity ):Promise<ListEntity> {

        const { id } = idUser;

        let list:ListEntity;
        
        if ( uuidValidate(termParams)) list = await this.listRepository.findOne({where: {id: termParams, user:{ id }}});

        if(!uuidValidate(termParams)) list = await this.listRepository.findOne({where: {title: termParams, user:{ id }}});

        if(!list) throw new NotFoundResponse('La lista no se encuentra');

        return list;
    }

    async update(termParams: any, idUser: UserEntity , {title, instructions, description, category}:ListUpdateDto):Promise<any> {

        title = title?.toLowerCase()

        const {id }:ListEntity = await this.getOne(termParams, idUser);

        const list = new ListUpdateDto(title, instructions, description, category);
        await this.fieldsValidate.validateOrReject(list);

        if( title ){
            const titleList = await this.listRepository.findOne({where: {title, user:{id: idUser.id}}});
            if(titleList && titleList.id !== id) throw new BadRequestResponse('El titulo ya existe, prueba con otro'); 
        }
        
        const listPreload = await this.listRepository.preload({id, ...list});
        

        return this.listRepository.save(listPreload);

    }

    async delete(termParams:any, idUser: UserEntity):Promise<void>{
        const {id}:ListEntity = await this.getOne(termParams, idUser);
        this.listRepository.softDelete({id});
    }

}