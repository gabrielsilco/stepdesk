import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";

@Entity()
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
}