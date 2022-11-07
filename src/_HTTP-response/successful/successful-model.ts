import { ISuccessfulModel } from "../../interfaces";


export class SuccessfulModel {

    name: string;
    status: number;
    msg: string;

    constructor( public res:any, public data?:object, public message?:string ){}

    response() {
        return this.res.status(this.status).json(this.bodyResponse());
    }

   private bodyResponse():ISuccessfulModel {
        return {
            error: false, 
            name: this.name, 
            status: this.status, 
            message: this.message ? this.message : this.msg, 
            data: this.data
        }
    }
};


