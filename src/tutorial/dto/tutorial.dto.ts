import { ApiProperty } from "@nestjs/swagger";
import { TutorialType } from "../enums/tutorial-type.enum";
import { CreateStepDto } from "./step.dto";

export class CreateTutorialDto {
    @ApiProperty({
        type: String,
        description: 'Tutorial title'
    })
    readonly title: string;

    @ApiProperty({
        type: String,
        description: 'Tutorial warning (if necessary)'
    })
    readonly warning: string;

    @ApiProperty({
        type: String,
        description: 'Tutorial warning expiration date'
    })
    readonly warningExpiration: Date;

    @ApiProperty({
        type: String,
        description: 'Tutorial summary'
    })
    readonly summary: string;

    @ApiProperty({
        type: String,
        description: 'Tutorial type'
    })
    readonly type: TutorialType;

    @ApiProperty({
        type: [String],
        description: 'Key words'
    })
    readonly keyWords: Array<String>;

    @ApiProperty({
        type: [CreateStepDto],
        description: 'Tutorial default steps'
    })
    readonly defaultSteps: Array<CreateStepDto>
}