import { ApiProperty } from "@nestjs/swagger";
import { StepType } from "../enums/step-type.enum";
import { CreateOptionDto } from "./create-option.dto";

export class CreateStepDto {
    @ApiProperty({
        type: String,
        description: 'Step title'
    })
    readonly title: string;

    @ApiProperty({
        type: String,
        description: 'Step content'
    })
    readonly content: string;

    @ApiProperty({
        type: String,
        description: 'Step type'
    })
    readonly type: StepType;

    @ApiProperty({
        type: [CreateOptionDto],
        description: 'Step fail options'
    })
    readonly failOptions: Array<CreateOptionDto>;
}