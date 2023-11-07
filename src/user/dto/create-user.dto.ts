import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsString({message:" first name should be string"})
    @IsNotEmpty({message:"should be include firstname"})
    firstname:string

    @IsString({message:"lastname should be string"})
    @IsNotEmpty({message:"last name should be include"})
    lastname:string

    token:string
  

    @IsEmail()
    email:string

    @IsNotEmpty()
    password:string
}
