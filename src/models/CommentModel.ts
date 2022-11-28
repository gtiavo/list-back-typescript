import { Repository } from "typeorm";
import { AppDataSource } from '../database/data-source';
import { CommnentEntity } from '../entities/CommentEntity';
import { FieldsValidate } from '../helpers';
import { CommentCreateDto } from '../dtos/comments';


export class CommentModel {

    private readonly commentRepository: Repository<CommnentEntity> = AppDataSource.getRepository(CommnentEntity);
    private readonly  fieldsValidate:FieldsValidate = new FieldsValidate();

    async create( {message}: CommentCreateDto ): Promise<CommnentEntity> {

        const newComment = new CommentCreateDto( message );
        await this.fieldsValidate.validateOrReject(newComment);

        const comment:CommnentEntity = this.commentRepository.create({message});

        return await this.commentRepository.save(comment);

    }


}