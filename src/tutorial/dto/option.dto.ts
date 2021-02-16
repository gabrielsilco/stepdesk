import { ApiProperty } from "@nestjs/swagger";

export class CreateOptionDto {
    @ApiProperty({
        type: String,
        description: 'Option label'
    })
    readonly label: string;

    @ApiProperty({
        type: String,
        description: 'Option path'
    })
    readonly path: string;

    @ApiProperty({
        type: Boolean,
        description: 'If the option is default'
    })
    readonly isDefault: boolean;
}