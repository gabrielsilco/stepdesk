import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength, Matches, IsEmail } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        type: String,
        description: 'The user first name'
    })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly firstName: string;

    @ApiProperty({
        type: String,
        description: 'The user last name'
    })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly lastName: string;

    @ApiProperty({
        type: String,
        description: 'The user e-mail'
    })
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        type: String,
        description: 'The user password'
    })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak. Please insert at least one upper case letter and one number'})
    password: string
}