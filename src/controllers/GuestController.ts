import { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../helpers';
import { CreatedResponse, OkResponse } from '../_HTTP-response/successful';
import { GuestModel } from '../models/GuestModel';
import { UserEntity } from '../entities/UserEntity';



export class GuestController {

    private readonly guestModel: GuestModel = new GuestModel();
    
    get create() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            const guestUser = await this.guestModel.createRelations(req.params, req.user as UserEntity);
            new CreatedResponse(res,{guestUser});
        })
    }

    get deleteUserRelations() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
             await this.guestModel.deleteUserRelations(req.params, req.user as UserEntity);
            new OkResponse(res);
        })
    }

    get deleteGuestUserRelations() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
             await this.guestModel.deleteGuestUserRelations(req.params, req.user as UserEntity);
            new OkResponse(res);
        })
    }

    get findGuestUserRelations() {
        return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
            const guestUsersrelations = await this.guestModel.getGuestUsers(req.user as UserEntity);
            new OkResponse(res, {guestUsersrelations});
        })
    }

}