import { ApiProperty } from "@nestjs/swagger";
import { TutorialType } from "../enums/tutorial-type.enum";

export class TutorialWithoutStepsDto {
    @ApiProperty({
        type: String,
        description: 'Tutorial title'
    })
    readonly title: string;

    @ApiProperty({
        type: String,
        description: 'Tutorial type'
    })
    readonly type: TutorialType;
}