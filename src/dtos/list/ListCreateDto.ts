import { IsLowercase, IsNotEmpty, IsString,  } from "class-validator";


export class ListCreateDto {
   
    @IsString()
    @IsNotEmpty()
    @IsLowercase()
    title: string;

    @IsString()
    @IsNotEmpty()
    instructions: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    constructor(  title: string, instructions: string, description: string, category:string ){
        this.title = title;
        this.instructions = instructions;
        this.description = description;
        this.category = category;
    }
}