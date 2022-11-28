import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../helpers';
import { CreatedResponse } from '../_HTTP-response/successful';
import { CommentModel } from '../models';


export class CommentController {

    private readonly commentModel: CommentModel = new CommentModel();

    get findAll() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            res.json({ok:true, message:'comments'})
            // const users = await this.userModel.find();
            // new OkResponse(res,{users})
        });
    }

    get findOne() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            res.json({ok:true, message:'comments'})
            // const users = await this.userModel.find();
            // new OkResponse(res,{users})
        });
    }

    get create() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {

            const users = await this.commentModel.create(req.body);
            new CreatedResponse(res,{users})

        });
    }

}