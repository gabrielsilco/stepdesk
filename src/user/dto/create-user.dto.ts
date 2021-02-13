import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        type: String,
        description: 'The user first name'
    })
    readonly firstName: string;

    @ApiProperty({
        type: String,
        description: 'The user last name'
    })
    readonly lastName: string;

    @ApiProperty({
        type: String,
        description: 'The user e-mail'
    })
    readonly email: string;

    @ApiProperty({
        type: String,
        description: 'The user password'
    })
    password: string
}