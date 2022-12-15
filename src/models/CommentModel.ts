import { Repository } from "typeorm";
import { validate as uuidValidate } from 'uuid';
import { AppDataSource } from '../database/data-source';
import { CommnentEntity } from '../entities/CommentEntity';
import { FieldsValidate } from '../helpers';
import { CommentCreateDto, CommentUpdateDto } from '../dtos/comments';
import { BadRequestResponse, NotFoundResponse, ForbiddenResponse } from '../_HTTP-response/errors/client-error-responses';
import { UserEntity } from '../entities/UserEntity';
import { ListModel } from './';


export class CommentModel {

    private readonly commentRepository: Repository<CommnentEntity> = AppDataSource.getRepository(CommnentEntity);
    private readonly  fieldsValidate:FieldsValidate = new FieldsValidate();
    private readonly listModels: ListModel = new ListModel();



    async create( {message}: CommentCreateDto, user:UserEntity, idListParams:any ): Promise<CommnentEntity> {

        const list = await this.listModels.oneListUserComments(idListParams, user);

        const newComment = new CommentCreateDto( message );
        await this.fieldsValidate.validateOrReject(newComment);

        const comment:CommnentEntity = this.commentRepository.create({...newComment, user, list});

        
        return await this.commentRepository.save(comment);

    }

    async find(idListParams:any, user:UserEntity):Promise<CommnentEntity[]> {
        await this.listModels.oneListUserComments(idListParams, user);
        return this.commentRepository.find({where:{list:{id: idListParams.idListParams}}});
    }

    async findOne( idParams:any ):Promise<CommnentEntity> {

        const { id } = idParams;
        if( !uuidValidate(id) )throw new BadRequestResponse('No es un ID valido');

        const comment:CommnentEntity = await this.commentRepository.findOne({where:{id}});
        if(!comment) throw new NotFoundResponse('El comentario no fue encontrado');


        return comment;

    }

    /**
     * 
     * @param idParams 
     * @param user 
     * @returns Comentario que coincida con el usuario que lo creo
     */
    async isUserCommentOk(idParams: any, user: UserEntity):Promise<CommnentEntity> {

        const comment = await this.findOne(idParams);
        const userComment:UserEntity = await Promise.resolve(comment.user);
        if(userComment.id !== user.id) throw new ForbiddenResponse();

        return comment;
    }

    async update(idParams:any, {message}: CommentUpdateDto, user: UserEntity):Promise<CommnentEntity> {

        const comment = await this.isUserCommentOk(idParams, user);

        const newComment = new CommentUpdateDto(message);
        await this.fieldsValidate.validateOrReject(newComment);

        const commentPreload = await this.commentRepository.preload({id: comment.id, ...newComment });

        return this.commentRepository.save(commentPreload);

    }

    async delete(idParams:any, user: UserEntity) {
        
        const comment = await this.isUserCommentOk(idParams, user);
        this.commentRepository.softDelete(comment.id);

    }


}