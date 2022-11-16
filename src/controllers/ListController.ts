import { ListModel } from '../models';
import { asyncHandler } from '../helpers';
import { CreatedResponse, OkResponse } from '../_HTTP-response/successful';
import { NextFunction, Request, Response } from 'express';
import { UserEntity } from '../entities/UserEntity';


export class ListController {

    private readonly listModel: ListModel = new ListModel();

    get create() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            const list = await this.listModel.create(req.body, req.user as UserEntity);
            new CreatedResponse(res,{list})
        })
    }

    get findAll() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            const list = await this.listModel.getAll(req.user as UserEntity);
            new OkResponse(res,{list})
        })
    }

    get findOne() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            const list = await this.listModel.getOne(req.params, req.user as UserEntity);
            new OkResponse(res,{list})
        })
    }

    get update() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            const list = await this.listModel.update(req.params,req.user as UserEntity, req.body);
            new OkResponse(res,{list})
        })
    }

    get delete() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            await this.listModel.delete(req.params, req.user as UserEntity);
            new OkResponse(res)
        })
    }

}