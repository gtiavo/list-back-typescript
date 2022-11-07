import { IsString, IsEmail, IsNotEmpty  } from 'class-validator';

export class AuthLoginDTo{
    
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    constructor( email:string, password: string ){
        this.email = email;
        this.password = password;
    }
}