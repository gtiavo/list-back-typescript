import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedResponse } from '../_HTTP-response/errors';

export  class JwtService {



    jwtGenerator(user: any) {
        return new Promise((resolve, reject) => {
            const payload = { id: user.id, fullName: user.fullName }

            jwt.sign( payload, process.env.SECRETKEYJWT,
                { expiresIn: "4h"},
                (err, token) => {
                    if(err) {
                        reject('Token not generated');
                    }else {
                        resolve(token)
                    }
                }
            )
        })
    }

   static jwtValidator() {
        return (req: any, res:Response, next: NextFunction) => {
            const token = req.header("x-token");

            if(!token) throw new UnauthorizedResponse("The authentication token has not been sent" );

            jwt.verify(token, process.env.SECRETORPRIVATEKEY, async (error:any, user: any) => {
                if (error) return res.status(400).send({ error: true, name: 'BadRequest', status: 400, message: "Invalid Token", data: [] });
                req.user = user;
                next();
            })
        }
    }

}