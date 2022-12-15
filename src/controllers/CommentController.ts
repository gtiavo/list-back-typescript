import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../helpers';
import { CreatedResponse, OkResponse } from '../_HTTP-response/successful';
import { CommentModel } from '../models';
import { UserEntity } from '../entities/UserEntity';



export class CommentController {

    private readonly commentModel: CommentModel = new CommentModel();

    get findAll() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            const comments = await this.commentModel.find(req.params, req.user as UserEntity);
            new OkResponse(res,{comments});
        });
    }

    get findOne() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            const comment = await this.commentModel.findOne(req.params);
            new OkResponse(res,{comment});
        });
    }

    get create() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {

            const comment = await this.commentModel.create(req.body, req.user as UserEntity, req.params);
            new CreatedResponse(res,{comment});

        });
    }

    get update() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            const comment = await this.commentModel.update(req.params, req.body, req.user as UserEntity);
            new OkResponse(res,{comment});
        });
    }

    get delete() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            await this.commentModel.delete(req.params, req.user as UserEntity);
            new OkResponse(res);
        });
    }

}