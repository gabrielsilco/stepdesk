import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, Unique, UpdateDateColumn } from "typeorm";
import { TutorialType } from "../enums/tutorial-type.enum";
import { DefaultStep } from "./default-step.entity";

@Entity()
@Unique(["title"])
export class Tutorial {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    title: string;

    @Column()
    type: TutorialType;

    @Column()
    keyWords: string;

    @Column(type => DefaultStep)
    defaultSteps: DefaultStep[]

    @CreateDateColumn()
    createdAt: Date;
}