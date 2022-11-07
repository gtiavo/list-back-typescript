import { validateOrReject  } from 'class-validator';
import { BadRequestResponse } from '../_HTTP-response/errors';


export class FieldsValidate {
    
   async validateOrReject(input: object):Promise<void>{
        try {
            await validateOrReject(input);
          } catch (errors:any) {
            const e = errors.map( (error:any) => ({ property: error.property, message: error.constraints}));
            throw new BadRequestResponse(e);
          }
    }

}