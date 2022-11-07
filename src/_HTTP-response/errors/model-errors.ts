import { IErrorsModel } from "../../interfaces";


export class ModelErrors extends Error {
    
    status: number;
    message:string;

    constructor( public msg?:string ) {
        super(msg)
        this.msg = msg
        this.status;
        this.message;
       
    }

    toJson():IErrorsModel {
        return {
            error: true,
            name: this.name,
            status:this.status,
            message: this.msg ? this.msg : this.message,
            data: {}
        }
    }
}

