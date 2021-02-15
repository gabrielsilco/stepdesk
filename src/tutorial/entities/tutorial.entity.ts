import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { TutorialType } from "../enums/tutorial-type.enum";
import { DefaultStep } from "./default-step.entity";

@Entity()
export class Tutorial {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    title: string;

    @Column()
    type: TutorialType;

    @Column(type => DefaultStep)
    defaultSteps: DefaultStep[]
}