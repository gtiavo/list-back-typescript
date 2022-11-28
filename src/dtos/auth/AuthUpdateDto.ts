import { IsString, IsEmail, MinLength, MaxLength, Matches, IsOptional  } from 'class-validator';

export class AuthUpdateDto {

    @IsString()
    @MinLength(1)
    @IsOptional()
    fullName?: string;

    @IsString()
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
            message: 'The password must have a Uppercase, lowercase letter and a number'
        })
    @IsOptional()
    password?: string;

    constructor(fullName: string, email:string, password:string){
        this.fullName = fullName;
        this.email = email;
        this.password = password;
    }

}