import { BadRequestResponse } from "../_HTTP-response/errors";


export const middlewareError = (error:any, req:any, res:any, next:any ) => {
    let errorObject:{error:boolean, name: string, status: number, message: string};

    if( typeof error.toJson === 'function' ) {

        errorObject = error.toJson()

    }else if(error.code === 'ER_DUP_ENTRY'){

       errorObject =  new BadRequestResponse(`${JSON.stringify(error.message)}`).toJson()

    } else {
        
        errorObject = {
            error: true,
            name: 'UnkwnwnError',
            status: 500,
            message: 'Unkwnwn Error ' + error.message,
        };
    }

    res.status(errorObject.status).json(errorObject);
}