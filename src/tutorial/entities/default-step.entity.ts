import { Column, Entity } from "typeorm";
import { StepType } from "../enums/step-type.enum";
import { FailOption } from "./fail-option.entity";

@Entity()
export class DefaultStep {
    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    type: StepType

    @Column(type => FailOption)
    failOptions: FailOption[]
}