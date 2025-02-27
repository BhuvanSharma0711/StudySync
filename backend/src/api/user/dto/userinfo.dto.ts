import { IsEmail, IsNotEmpty, IsString } from "class-validator"

class UserInfoDto {
    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password:string
}

export default UserInfoDto;