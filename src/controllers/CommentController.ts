import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../helpers';
import { CreatedResponse, OkResponse } from '../_HTTP-response/successful';
import { CommentModel } from '../models';



export class CommentController {

    private readonly commentModel: CommentModel = new CommentModel();

    get findAll() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            const comments = await this.commentModel.find();
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

            const comment = await this.commentModel.create(req.body);
            new CreatedResponse(res,{comment});

        });
    }

    get update() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            const comment = await this.commentModel.update(req.params, req.body);
            new OkResponse(res,{comment});
        });
    }

    get delete() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            await this.commentModel.delete(req.params);
            new OkResponse(res);
        });
    }

}