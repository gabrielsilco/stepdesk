import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class FailOption {
    // @ObjectIdColumn()
    // _id: ObjectID

    @PrimaryColumn({
        default: 'Encaminhar para analista'
    })
    label: string;

    @Column()
    path: string;

    @Column()
    isDefault: boolean;
}