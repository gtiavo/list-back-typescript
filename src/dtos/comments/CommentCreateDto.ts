import { IsNotEmpty, IsString, Min } from "class-validator";


export class CommentCreateDto {

    @IsString()
    @IsNotEmpty()
    message: string;

    constructor(message: string) {
        this.message = message
    }

}