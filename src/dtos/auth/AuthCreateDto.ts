import { IsString, IsEmail, MinLength, MaxLength, Matches  } from 'class-validator';

export class AuthCreateDto {

    @IsString()
    @MinLength(1)
    fullName: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'The password must have a Uppercase, lowercase letter and a number'
        })
    password: string;

    constructor(fullName: string, email:string, password:string){
        this.fullName = fullName;
        this.email = email;
        this.password = password;
    }

}