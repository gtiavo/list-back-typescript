import { Repository } from "typeorm";
import { validate as uuidValidate } from 'uuid';
import { AppDataSource } from '../database/data-source';
import { CommnentEntity } from '../entities/CommentEntity';
import { FieldsValidate } from '../helpers';
import { CommentCreateDto, CommentUpdateDto } from '../dtos/comments';
import { BadRequestResponse, NotFoundResponse } from '../_HTTP-response/errors/client-error-responses';


export class CommentModel {

    private readonly commentRepository: Repository<CommnentEntity> = AppDataSource.getRepository(CommnentEntity);
    private readonly  fieldsValidate:FieldsValidate = new FieldsValidate();

    async create( {message}: CommentCreateDto ): Promise<CommnentEntity> {

        const newComment = new CommentCreateDto( message );
        await this.fieldsValidate.validateOrReject(newComment);

        const comment:CommnentEntity = this.commentRepository.create({message});

        return await this.commentRepository.save(comment);

    }

    async find():Promise<CommnentEntity[]> {
        return this.commentRepository.find();
    }

    async findOne( idParams:any ):Promise<CommnentEntity> {

        const { id } = idParams;
        if( !uuidValidate(id) )throw new BadRequestResponse('No es un ID valido');

        const comment:CommnentEntity = await this.commentRepository.findOne({where:{id}});
        if(!comment) throw new NotFoundResponse('El comentario no fue encontrado');

        return comment;

    }

    async update(idParams:any, {message}: CommentUpdateDto):Promise<CommnentEntity> {

        const { id } = await this.findOne(idParams);

        const newComment = new CommentUpdateDto(message);
        await this.fieldsValidate.validateOrReject(newComment);

        const commentPreload = await this.commentRepository.preload({id, ...newComment });

        return this.commentRepository.save(commentPreload);

    }

    async delete(idParams:any) {
        
        const { id } = await this.findOne(idParams);
        this.commentRepository.softDelete(id);

    }


}