import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../helpers';
import { UserModel } from '../models/UserModel';
import {  OkResponse } from '../_HTTP-response/successful/successful-response';


export class UserController {

    private readonly userModel = new UserModel();

    get findAll() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            const users = await this.userModel.find();
            new OkResponse(res,{users})
        });
    }

    get findOne() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            const user = await this.userModel.findOne(req.params);
            new OkResponse(res,{user})
        });
    }

    get update() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            const user = await this.userModel.update(req.params, req.body);
            new OkResponse(res,{user})
        });
    }

    get delete() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            const user = await this.userModel.delete(req.params);
            new OkResponse(res,{user})
        });
    }

}