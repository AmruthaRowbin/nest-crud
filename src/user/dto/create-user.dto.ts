import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsString({message:"should be string"})
    @IsNotEmpty({message:"should be include firstname"})
    firstname:string

    @IsString({message:"lastname should be string"})
    @IsNotEmpty({message:"last name should be include"})
    lastname:string

    
    @IsNotEmpty({message:"email must conatin @ and a valid format"})
    email:string
}
