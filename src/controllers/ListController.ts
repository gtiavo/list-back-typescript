import { ListModel } from '../models';
import { asyncHandler } from '../helpers';
import { CreatedResponse, OkResponse } from '../_HTTP-response/successful';
import { NextFunction, Request, Response } from 'express';


export class ListController {

    private readonly listModel: ListModel = new ListModel();

    get create() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            const list = await this.listModel.create(req.body, req.user);
            new CreatedResponse(res,{list})
        })
    }

    get findAll() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            const list = await this.listModel.getAll();
            new OkResponse(res,{list})
        })
    }

    get findOne() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            const list = await this.listModel.getOne(req.params);
            new OkResponse(res,{list})
        })
    }

    get update() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            const list = await this.listModel.update(req.params, req.body);
            new OkResponse(res,{list})
        })
    }

    get delete() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            await this.listModel.delete(req.params);
            new OkResponse(res)
        })
    }

}