import { SuccessfulModel } from "./successful-model";



export class OkResponse extends SuccessfulModel {
    constructor(res:any, data?:object, message?:string){
        super(res, data, message)

        this.name = 'OK';
        this.status = 200;
        this.msg = 'OK';

        this.response();
    }
};

export class CreatedResponse extends SuccessfulModel {
    constructor(res:any, data?:object, message?:string){
        super(res, data, message)

        this.name = 'Created';
        this.status = 201;
        this.msg = 'The request succeeded, and a new resource was created as a result';

        this.response();
    }
};

