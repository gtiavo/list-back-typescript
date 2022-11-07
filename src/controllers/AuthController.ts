import {  NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../helpers';
// import { AuthCreateDto, AuthLoginDTo } from '../dtos/auth';
import { UserEntity } from '../entities/UserEntity';
import { AuthModel } from '../models/AuthModel';
import { OkResponse, CreatedResponse } from '../_HTTP-response/successful';

export class AuthController {
    
   private readonly  authService: AuthModel = new AuthModel();
 

   get register(){
    return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
        const user = await this.authService.create(req.body);
        new CreatedResponse(res,{user})
    })
}

  get login(){ 
    return asyncHandler(async(req:Request, res:Response, next:NextFunction) => {
        const user = await this.authService.login(req.body);
        new OkResponse(res,{user});
    })
}


}