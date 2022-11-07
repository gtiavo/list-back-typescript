import { IsLowercase, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class ListUpdateDto {
   
    @IsString()
    @IsNotEmpty()
    @IsLowercase()
    @IsOptional()
    title?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    instructions?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    category?: string;

    constructor(  title: string, instructions: string, description: string, category:string ){
        this.title = title;
        this.instructions = instructions;
        this.description = description;
        this.category = category;
    }
}