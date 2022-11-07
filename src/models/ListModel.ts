import { Repository } from "typeorm";
import { AppDataSource } from '../database/data-source';
import { validate as uuidValidate } from 'uuid';
import { ListEntity } from '../entities';
import { FieldsValidate } from '../helpers';
import { ListCreateDto } from "../dtos/list";
import { NotFoundResponse } from "../_HTTP-response/errors";
import { ListUpdateDto } from '../dtos/list/ListUpdateDto';


export class ListModel {

    private readonly listRepository: Repository<ListEntity> = AppDataSource.getRepository(ListEntity);
    private readonly  fieldsValidate:FieldsValidate = new FieldsValidate();

    async create({instructions, title, category,description}: ListCreateDto, user:any ):Promise<ListEntity> {
        title = title.toLowerCase()
        const newList = new ListCreateDto(title, instructions, description, category );
        await this.fieldsValidate.validateOrReject(newList);

        const createList = this.listRepository.create({
            ...newList,
            user: user
        })

        await this.listRepository.save(createList);

        return createList;

    }

    async getAll():Promise<ListEntity[]> {
        return await this.listRepository.find();
    }

    async getOne({termParams}:any ):Promise<ListEntity> {

        let list:ListEntity;
        
        if ( uuidValidate(termParams)) list = await this.listRepository.findOne({where: {id: termParams}});

        if(!uuidValidate(termParams)) list = await this.listRepository.findOne({where: {title: termParams}});

        if(!list) throw new NotFoundResponse('La lista no se encuentra');

        return list;
    }

    async update(termParams: any, {title, instructions, description, category}:ListUpdateDto):Promise<any> {

        title = title.toLowerCase()

        const {id}:ListEntity = await this.getOne(termParams);

        const list = new ListUpdateDto(title, instructions, description, category);
        await this.fieldsValidate.validateOrReject(list);

        const listPreload = await this.listRepository.preload({id, ...list});
        if(!listPreload) throw new NotFoundResponse('not found');

        return this.listRepository.save(listPreload);

    }

    async delete(termParams:any):Promise<void>{
        const {id}:ListEntity = await this.getOne(termParams);
        this.listRepository.softDelete({id});
    }

}