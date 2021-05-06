import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({
        type: String,
        description: 'The user registered e-mail'
    })
    email: string;

    @ApiProperty({
        type: String,
        description: 'The user registered password'
    })
    password: string;
}