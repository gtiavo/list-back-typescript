import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CommentUpdateDto {

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    message?: string;

    constructor(message?: string) {
        this.message = message
    }

}