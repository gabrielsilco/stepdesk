import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, Unique } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";

@Entity()
@Unique(["email"])
export class User {

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;
}