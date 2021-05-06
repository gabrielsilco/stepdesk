import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt'

@Entity()
@Unique(["email"])
export class User {

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @CreateDateColumn()
    createdAt: Date;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);

        return hash === this.password;
    }
}