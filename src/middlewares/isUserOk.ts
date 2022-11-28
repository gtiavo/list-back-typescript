import { NextFunction, Request, Response } from "express";
import { UserEntity } from '../entities/UserEntity';
import { UnauthorizedResponse } from '../_HTTP-response/errors/client-error-responses';


export const isUserOk = ( req:Request, res:Response, next:NextFunction ) => {

    const { id: userIdToken } = req.user as UserEntity;
    const { idUserParams } = req.params;

    
    if( userIdToken !== idUserParams ) throw new UnauthorizedResponse();

    next();
}